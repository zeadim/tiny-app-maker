import { InputHolder } from "./input-holder";
import { Action } from "./actions/action";
import { actionMap } from "./action-map";
import { App } from "./app";
import { EventState, InputState } from "./types";

export class InputListenerActionSource extends InputHolder {
    private inputListeners = new Map<string, (value: any) => unknown>();
    private inputVariablesReversed = new Map<string, string>();
    private events = new Map<string, Action[]>();

    public constructor(app: App, inputs: InputState[], events: EventState[]) {
        super(app, inputs);

        for (const [name, variable] of this.inputVariables) {
            this.inputVariablesReversed.set(variable, name);
        }

        for (const event of events) {
            const actions = [];

            for (const actionConfig of event.actions) {
                const { name, inputs } = actionConfig;

                if (name === 'do-nothing')
                    continue;

                const ActionClass = actionMap.get(name);
                if (!ActionClass) {
                    console.warn(`Unsupported action type in config: ${name}`);
                    continue;
                }

                const action = new ActionClass(this.app, inputs);
                actions.push(action);
            }

            this.events.set(event.name, actions);
        }

        this.app.addEventListener('update', (event) => this.onVariableChange(event as CustomEvent));
    }

    protected notifyInitialInputUpdates(): void {
        for (const [name, _] of this.inputListeners) {
            const value = this.getInput(name);
            this.notifyInputUpdate(name, value);
        }
    }

    public addInputListener(name: string, listener: (value: any) => unknown): void {
        this.inputListeners.set(name, listener);
    }

    public addInputBooleanListener(name: string, listener: (value?: boolean) => unknown): void {
        this.inputListeners.set(name, (value) => listener(App.parseBoolean(value)));
    }

    public addInputStringListener(name: string, listener: (value?: string) => unknown): void {
        this.inputListeners.set(name, (value) => listener(App.parseString(value)));
    }

    public addInputNumberListener(name: string, listener: (value?: number) => unknown): void {
        this.inputListeners.set(name, (value) => listener(App.parseNumber(value)));
    }

    public addInputColorListener(name: string, listener: (value?: string) => unknown): void {
        this.inputListeners.set(name, (value) => listener(App.parseColor(value)));
    }

    public async triggerEvent(name: string): Promise<void> {
        if (!this.events.has(name))
            return;

        const actions = this.events.get(name)!;

        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];
            const index = await action.execute();
            if (index !== undefined)
                i = Math.max(0, index) - 1;

            await new Promise((resolve) => setTimeout(resolve, 0));
        }
    }

    private onVariableChange(event: CustomEvent): void {
        const { variable, value } = event.detail;

        if (this.inputVariablesReversed.has(variable)) {
            const name = this.inputVariablesReversed.get(variable)!;
            this.notifyInputUpdate(name, value);
        }
    }

    private notifyInputUpdate(name: string, value: any): void {
        if (!this.inputListeners.has(name))
            return;

        const listener = this.inputListeners.get(name)!;
        listener(value);
    }
}
