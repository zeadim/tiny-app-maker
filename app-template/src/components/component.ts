import { InputHolder } from "../input-holder";
import { Action } from "../actions/action";
import { actionMap } from "../action-map";
import { App } from "../app";
import { EventState, InputState } from "../types";

export class Component extends InputHolder {
    protected x0: number;
    protected y0: number;
    protected x1: number;
    protected y1: number;

    private inputListeners = new Map<string, (value: any) => unknown>();
    private inputVariablesReversed = new Map<string, string>();
    private events = new Map<string, Action[]>();

    public htmlElement: HTMLElement;

    public constructor(app: App, x0: number, y0: number, x1: number, y1: number, inputs: InputState[], events: EventState[]) {
        super(app, inputs);
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;

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

        this.htmlElement = this.createHtmlElement();
        /*const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.minWidth = '0';
        div.style.maxWidth = '100%';
        div.style.overflow = 'hidden';
        div.style.backgroundColor = 'white';
        div.style.boxShadow = '0 0 1px 0px rgba(0, 0, 0, 0.2)';
        //div.style.border = '1px solid black';
        div.appendChild(this.htmlElement);
        this.htmlElement.style.flex = '1';
        this.htmlElement = div;*/
        this.htmlElement.style.gridColumnStart = `${this.x0}`;
        this.htmlElement.style.gridRowStart = `${this.y0}`;
        this.htmlElement.style.gridColumnEnd = `${this.x1}`;
        this.htmlElement.style.gridRowEnd = `${this.y1}`;

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

    protected createHtmlElement(): HTMLElement {
        return document.createElement('div');
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
