import { Action } from "../action";

export class $Alert extends Action {

    public override async execute(): Promise<number | undefined> {
        const message = this.getInputString('message');

        window.alert(message);
        
        return undefined;
    }
}
