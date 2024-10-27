import { Action } from "../action";

export class $Alert extends Action {

    public override async execute(): Promise<boolean> {
        const message = this.getInput('message');
        window.alert(message);
        return false;
    }
}
