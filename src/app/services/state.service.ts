import { Injectable } from '@angular/core';
import { State } from '../types/state';

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

    public undo(): void {
        if (this.historyPointer < 0)
            return;

        this.historyPointer = Math.max(0, this.historyPointer - 1);
        this.currentState = this.copy(this.history[this.historyPointer]);
    }

    public redo(): void {
        if (this.historyPointer >= this.history.length - 1)
            return;

        this.historyPointer += 1;
        this.currentState = this.copy(this.history[this.historyPointer]);
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
}
