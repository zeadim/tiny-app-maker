import { Injectable } from '@angular/core';
import { ComponentState, State } from '../types/state';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private history: State[] = [];
    private historyPointer: number = -1;
    private currentState!: State;

    public setInitialState(state: State): void {
        this.historyPointer = -1;
        this.currentState = state;
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
        return this.detectChangedComponent(previousState, this.currentState);
    }

    public redo(): ComponentState | undefined {
        if (this.historyPointer >= this.history.length - 1)
            return;

        const previousState = this.currentState;
        this.historyPointer += 1;
        this.currentState = this.copy(this.history[this.historyPointer]);
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
                outputs: component.outputs.map(output => ({ ...output })),
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
