import { App } from "./app";
import { InputState } from "./types";

export class Action {
    protected app: App;

    private inputConstants = new Map<string, any>();
    private inputVariables = new Map<string, string>();

    public constructor(app: App, inputs: InputState[]) {
        this.app = app;

        for (const input of inputs) {
            if (input.value == null)
                continue;

            if (input.variable) {
                this.inputVariables.set(input.name, input.value);
            } else {
                this.inputConstants.set(input.name, input.value);
            }
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

    public async execute(): Promise<boolean> {
        return false;
    }
}
