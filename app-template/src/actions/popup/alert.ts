import { Action } from "../action";

export class $Alert extends Action {

    public override async execute(): Promise<number | undefined> {
        const message = this.getInput('message');

        window.alert(message);
        
        return undefined;
    }
}
