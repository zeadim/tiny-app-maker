import { Injectable } from '@angular/core';
import { ComponentState, GridEditorState, InputState, ActionState, EventState, GlobalEventState, State } from '../types/state';
import { componentList } from '../../config/component-list';
import { actionList } from '../../config/action-list';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private variables: string[] = [];
    private componentConfigurationVariables: Map<string, Set<string>> = new Map();
    private actionConfigurationVariables: Map<string, Set<string>> = new Map();

    private gridEditorHistory: GridEditorState[] = [];
    private gridEditorHistoryPointer: number = -1;

    private globalEventsHistory: GlobalEventState[][] = [];
    private globalEventsHistoryPointer: number = -1;

    public settings!: InputState[];
    public gridEditor!: GridEditorState;
    public globalEvents!: GlobalEventState[];

    public constructor() {
        for (const component of componentList) {
            const variables = new Set(component.inputs.filter(x => x.type === 'variable').map(x => x.name));
            this.componentConfigurationVariables.set(component.name, variables);
        }

        for (const action of actionList) {
            const variables = new Set(action.inputs.filter(x => x.type === 'variable').map(x => x.name));
            this.actionConfigurationVariables.set(action.name, variables);
        }
    }

    public setInitialState(settings: InputState[], gridEditor: GridEditorState, globalEvents: GlobalEventState[]): void {
        console.log(settings, gridEditor, globalEvents);
        this.gridEditorHistoryPointer = -1;
        this.globalEventsHistoryPointer = -1;

        this.settings = settings;
        this.gridEditor = gridEditor;
        this.globalEvents = globalEvents;

        this.updateVariables();
        this.pushGridEditorState();
        this.pushGlobalEventsState();
    }

    public undoGridEditorState(): ComponentState | undefined {
        if (this.gridEditorHistoryPointer < 0)
            return;

        const previousState = this.gridEditor;
        this.gridEditorHistoryPointer = Math.max(0, this.gridEditorHistoryPointer - 1);
        this.gridEditor = this.copyGridEditorState(this.gridEditorHistory[this.gridEditorHistoryPointer]);
        this.updateVariables();

        return this.detectChangedComponent(previousState.components, this.gridEditor.components);
    }

    public redoGridEditorState(): ComponentState | undefined {
        if (this.gridEditorHistoryPointer >= this.gridEditorHistory.length - 1)
            return;

        const previousState = this.gridEditor;
        this.gridEditorHistoryPointer += 1;
        this.gridEditor = this.copyGridEditorState(this.gridEditorHistory[this.gridEditorHistoryPointer]);
        this.updateVariables();

        return this.detectChangedComponent(previousState.components, this.gridEditor.components);
    }

    public undoGlobalEventsState(): GlobalEventState | undefined {
        if (this.globalEventsHistoryPointer < 0)
            return;

        const previousState = this.globalEvents;
        this.globalEventsHistoryPointer = Math.max(0, this.globalEventsHistoryPointer - 1);
        this.globalEvents = this.copyGlobalEventsState(this.globalEventsHistory[this.globalEventsHistoryPointer]);
        this.updateVariables();

        return this.detectChangedComponent(previousState, this.globalEvents);
    }

    public redoGlobalEventsState(): GlobalEventState | undefined {
        if (this.globalEventsHistoryPointer >= this.globalEventsHistory.length - 1)
            return;

        const previousState = this.globalEvents;
        this.globalEventsHistoryPointer += 1;
        this.globalEvents = this.copyGlobalEventsState(this.globalEventsHistory[this.globalEventsHistoryPointer]);
        this.updateVariables();

        return this.detectChangedComponent(previousState, this.globalEvents);
    }

    public pushGridEditorState(): void {
        this.gridEditorHistoryPointer += 1;
        this.gridEditorHistory.length = this.gridEditorHistoryPointer + 1;
        this.gridEditorHistory[this.gridEditorHistoryPointer] = this.copyGridEditorState(this.gridEditor);
    }

    public pushGlobalEventsState(): void {
        this.globalEventsHistoryPointer += 1;
        this.globalEventsHistory.length = this.globalEventsHistoryPointer + 1;
        this.globalEventsHistory[this.globalEventsHistoryPointer] = this.copyGlobalEventsState(this.globalEvents);
    }

    public copyGridEditorState(state: GridEditorState): GridEditorState {
        return {
            width: state.width,
            height: state.height,
            components: state.components.map(x => this.copyComponentState(x)),
        };
    }

    public copyGlobalEventsState(state: GlobalEventState[]): GlobalEventState[] {
        return state.map(x => this.copyComponentState(x));
    }

    public copyComponentState(component: ComponentState): ComponentState {
        return {
            ...component,
            inputs: component.inputs.map(x => this.copyInputState(x)),
            events: component.events.map(x => this.copyEventState(x)),
        };
    }

    public copyEventState(event: EventState): EventState {
        return {
            ...event,
            actions: event.actions.map(x => this.copyActionState(x)),
        };
    }

    public copyActionState(action: ActionState): ActionState {
        return {
            ...action,
            inputs: action.inputs.map(x => this.copyInputState(x)),
        };
    }

    public copyInputState(input: InputState): InputState {
        return { ...input };
    }

    public getVariables(): string[] {
        return this.variables;
    }

    public async getStateHash(): Promise<string> {
        const json = JSON.stringify({
            settings: this.settings,
            gridEditor: this.gridEditor,
            globalEvents: this.globalEvents,
        });

        return this.convertToBase64(await this.compress(json));
    }

    public async setInitialStateFromHash(hash: string, defaultState: State): Promise<void> {
        let data: State | undefined;
        try {

            const json = await this.decompress(this.convertFromBase64(hash));
            data = JSON.parse(json);
        } catch (err) {
            //
        }

        if (!data)
            data = defaultState;

        console.log(hash, 'data (default? ' + (data === defaultState) + ')', data);

        this.setInitialState(data.settings, data.gridEditor, data.globalEvents);
    }

    public updateVariables(): void {
        (async () => {
            // TODO: put this hash update in a more correct, central place
            const hash = await this.getStateHash();
            location.hash = hash;
            console.log('hash updated');
        })();

        const variables = this.gridEditor.components.flatMap(component => {
            const componentVariables = this.findVariablesInInputs(component.name, component.inputs, this.componentConfigurationVariables);
            const actionVariables = component.events
                .flatMap(event => event.actions
                    .flatMap(action => this.findVariablesInInputs(action.name, action.inputs, this.actionConfigurationVariables)));

            return [...componentVariables, ...actionVariables];
        });

        this.variables = [...new Set(variables)].sort((a, b) => a.localeCompare(b));
    }

    private findVariablesInInputs(name: string, inputs: InputState[], configurationVariables: Map<string, Set<string>>): string[] {
        const variables = configurationVariables.get(name);
        if (!variables)
            return [];

        return inputs
            .filter(x => variables.has(x.name) && typeof x.value === 'string' && x.value.trim() !== '')
            .map(x => x.value.trim().toUpperCase());
    }

    private detectChangedComponent(previousState: ComponentState[], currentState: ComponentState[]): ComponentState | undefined {
        const unchangedComponents: ComponentState[] = [];
        const previousStateStrings = previousState.map(x => JSON.stringify(x));
        const currentStateStrings = currentState.map(x => JSON.stringify(x));

        for (let i = 0; i < currentState.length; i++) {
            for (let j = 0; j < previousState.length; j++) {
                if (currentStateStrings[i] === previousStateStrings[j]) {
                    unchangedComponents.push(currentState[i]);
                    break;
                }
            }
        }

        return currentState.filter(x => !unchangedComponents.includes(x))[0];
    }

    private convertToBase64(arrayBuffer: ArrayBuffer): string {
        return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    }

    private convertFromBase64(encoded: string): ArrayBuffer {
        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }

    private async compress(str: string): Promise<ArrayBuffer> {
        const byteArray = new TextEncoder().encode(str);
        const cs = new CompressionStream('deflate-raw');
        const writer = cs.writable.getWriter();
        writer.write(byteArray);
        writer.close();
        return new Response(cs.readable).arrayBuffer();
    }

    private async decompress(byteArray: ArrayBuffer): Promise<string> {
        const cs = new DecompressionStream('deflate-raw');
        const writer = cs.writable.getWriter();
        writer.write(byteArray);
        writer.close();
        const arrayBuffer = await new Response(cs.readable).arrayBuffer();
        return new TextDecoder().decode(arrayBuffer);
    }
}
