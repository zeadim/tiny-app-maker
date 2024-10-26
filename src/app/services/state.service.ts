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
    private componentConfigurationVariables: Set<string>;
    private actionConfigurationVariables: Set<string>;

    public constructor() {
        this.componentConfigurationVariables = new Set(
            componentList.flatMap(x => x.inputs.filter(y => y.type === 'variable')).map(x => x.name),
        );

        this.actionConfigurationVariables = new Set(
            actionList.flatMap(x => x.inputs.filter(y => y.type === 'variable')).map(x => x.name),
        );
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
        console.log('pushed state', JSON.stringify(this.currentState));
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
        this.variables = this.currentState.components.flatMap(component => {
            const componentVariables = this.findVariablesInInputs(component.inputs, this.componentConfigurationVariables);
            const actionVariables = component.events
                .flatMap(event => event.actions.flatMap(action => this.findVariablesInInputs(action.inputs, this.actionConfigurationVariables)));

            return [...componentVariables, ...actionVariables].sort((a, b) => a.localeCompare(b));
        });
    }

    private findVariablesInInputs(inputs: InputState[], configurationVariables: Set<string>): string[] {
        return inputs.filter(x => configurationVariables.has(x.name)).filter(x => x.value).map(x => x.value ?? '');
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
