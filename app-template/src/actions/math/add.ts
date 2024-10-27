import { Action } from "../action";

export class $Add extends Action {

    public override async execute(): Promise<number | undefined> {
        const value1 = +this.getInput('value1');
        const value2 = +this.getInput('value2');
        const variable = this.getInput('result');

        let result = value1 + value2;
        if (Number.isNaN(result))
            result = 0;
        console.log(result, value1, value2, variable);
        this.app.setVariableValue(variable, result);

        return undefined;
    }
}
