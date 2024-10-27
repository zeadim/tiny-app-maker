import { Action } from "./action";
import { actionMap } from "./action-map";
import { App } from "./app";
import { EventState, InputState } from "./types";

export class Component {
    protected app: App;
    protected x0: number;
    protected y0: number;
    protected x1: number;
    protected y1: number;

    private inputConstants = new Map<string, any>();
    private inputVariables = new Map<string, string>();
    private inputVariablesReversed = new Map<string, string>();
    private events = new Map<string, Action[]>();

    public htmlElement: HTMLElement;

    public constructor(app: App, x0: number, y0: number, x1: number, y1: number, inputs: InputState[], events: EventState[]) {
        this.app = app;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;

        for (const input of inputs) {
            if (input.value == null)
                continue;

            if (input.variable) {
                this.inputVariables.set(input.name, input.value);
                this.inputVariablesReversed.set(input.value, input.name);
            } else {
                this.inputConstants.set(input.name, input.value);
            }
        }

        for (const event of events) {
            const actions = [];

            for (const actionConfig of event.actions) {
                const { name, inputs } = actionConfig;

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

        this.htmlElement = this.createHtmlElement();
        this.htmlElement.style.gridColumnStart = `${this.x0}`;
        this.htmlElement.style.gridRowStart = `${this.y0}`;
        this.htmlElement.style.gridColumnEnd = `${this.x1}`;
        this.htmlElement.style.gridRowEnd = `${this.y1}`;

        for (const [name, value] of this.inputConstants) {
            this.onInputUpdate(name, value);
        }
    }

    public getInput(name: string): any {
        if (this.inputConstants.has(name))
            return this.inputConstants.get(name);

        if (this.inputVariables.has(name)) {
            const variable = this.inputVariables.get(name);
            return this.app.getVariableValue(variable);
        }

        return undefined;
    }

    public async triggerEvent(name: string): Promise<boolean> {
        if (!this.events.has(name))
            return false;

        const actions = this.events.get(name)!;
        
        for (const action of actions) {
            const stop = await action.execute();
            if (stop)
                return true;

            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        return false;
    }

    protected createHtmlElement(): HTMLElement {
        return document.createElement('div');
    }

    protected onInputUpdate(name: string, value: any): void {
        //
    }

    private onVariableChange(event: CustomEvent): void {
        const { variable, value } = event.detail;
        
        if (this.inputVariablesReversed.has(variable)) {
            const name = this.inputVariablesReversed.get(variable)!;
            this.onInputUpdate(name, value);
        }
    }
}
