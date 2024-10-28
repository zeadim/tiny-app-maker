import { App } from "./app";
import { InputState } from "./types";

export class InputHolder {
    protected app: App;

    protected inputConstants = new Map<string, any>();
    protected inputVariables = new Map<string, string>();

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
            const variable = this.inputVariables.get(name) ?? '';
            return this.app.getVariableValue(variable);
        }

        return undefined;
    }

    public getInputBoolean(name: string): boolean {
        return App.parseBoolean(this.getInput(name)) ?? false;
    }

    public getInputString(name: string): string {
        return App.parseString(this.getInput(name)) ?? '';
    }

    public getInputNumber(name: string): number {
        return App.parseNumber(this.getInput(name)) ?? 0;
    }
}