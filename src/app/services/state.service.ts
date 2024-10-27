import { Injectable } from '@angular/core';
import { ComponentState, InputState, State } from '../types/state';
import { componentList } from '../../config/component-list';
import { actionList } from '../../config/action-list';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private history: State[] = [];
    private historyPointer: number = -1;
    private currentState!: State;
    private variables: string[] = [];
    private componentConfigurationVariables: Map<string, Set<string>> = new Map();
    private actionConfigurationVariables: Map<string, Set<string>> = new Map();

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

    public setInitialState(state: State): void {
        this.historyPointer = -1;
        this.currentState = state;
        this.updateVariables();
        this.push();
    }

    public getCurrentState(): State {
        return this.currentState;
    }

    public undo(): ComponentState | undefined {
        if (this.historyPointer < 0)
            return;

        const previousState = this.currentState;
        this.historyPointer = Math.max(0, this.historyPointer - 1);
        this.currentState = this.copy(this.history[this.historyPointer]);
        this.updateVariables();
        return this.detectChangedComponent(previousState, this.currentState);
    }

    public redo(): ComponentState | undefined {
        if (this.historyPointer >= this.history.length - 1)
            return;

        const previousState = this.currentState;
        this.historyPointer += 1;
        this.currentState = this.copy(this.history[this.historyPointer]);
        this.updateVariables();
        return this.detectChangedComponent(previousState, this.currentState);
    }

    public push(): void {
        this.historyPointer += 1;
        this.history.length = this.historyPointer + 1;
        this.history[this.historyPointer] = this.copy(this.currentState);
    }

    public copy(state: State): State {
        return {
            ...state,
            components: state.components.map(component => ({
                ...component,
                inputs: component.inputs.map(input => ({ ...input })),
                events: component.events.map(event => ({
                    ...event,
                    actions: event.actions.map(action => ({
                        ...action,
                        inputs: action.inputs.map(input => ({ ...input })),
                    })),
                })),
            })),
        };
    }

    public getVariables(): string[] {
        return this.variables;
    }

    public updateVariables(): void {
        const variables = this.currentState.components.flatMap(component => {
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

        return inputs.filter(x => variables.has(x.name)).filter(x => x.value).map(x => `${x.value}`);
    }

    private detectChangedComponent(previousState: State, currentState: State): ComponentState | undefined {
        const unchangedComponents: ComponentState[] = [];
        const previousStateStrings = previousState.components.map(x => JSON.stringify(x));
        const currentStateStrings = currentState.components.map(x => JSON.stringify(x));

        for (let i = 0; i < currentState.components.length; i++) {
            for (let j = 0; j < previousState.components.length; j++) {
                if (currentStateStrings[i] === previousStateStrings[j]) {
                    unchangedComponents.push(currentState.components[i]);
                    break;
                }
            }
        }

        return currentState.components.filter(x => !unchangedComponents.includes(x))[0];
    }
}
