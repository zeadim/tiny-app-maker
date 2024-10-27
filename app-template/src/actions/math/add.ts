import { Action } from "../action";

export class $Add extends Action {

    public override async execute(): Promise<number | undefined> {
        const value1 = this.getInputNumber('value1');
        const value2 = this.getInputNumber('value2');
        const variable = this.getInputString('result');

        const result = value1 + value2;
        this.app.setVariableValue(variable, result);

        return undefined;
    }
}
