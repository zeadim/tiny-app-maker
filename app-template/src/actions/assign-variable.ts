import { Action } from "../action";

export class $AssignVariable extends Action {

    public override async execute(): Promise<boolean> {
        const variableName = this.getInput('variable');
        const value = this.getInput('value');
        this.app.setVariableValue(variableName, value);
        return false;
    }
}
