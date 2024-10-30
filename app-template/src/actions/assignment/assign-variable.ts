import { Action } from "../action";

export class $AssignVariable extends Action {

    public override async execute(): Promise<number | undefined> {
        const value = this.getInput('value');
        const variableName = this.getInputVariable('output-variable');

        this.app.setVariableValue(variableName, value);

        return undefined;
    }
}
