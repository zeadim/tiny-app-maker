import { Action } from "../action";

export class $AssignVariable extends Action {

    public override async execute(): Promise<number | undefined> {
        const variableName = this.getInput('variable');
        const value = this.getInput('value');

        this.app.setVariableValue(variableName, value);
        
        return undefined;
    }
}
