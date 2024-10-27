import { Action } from "../action";

export class $GoTo extends Action {

    public override async execute(): Promise<number | undefined> {
        const index = this.getInputNumber('index');
        const condition = this.getInputBoolean('condition');
        
        return condition ? index - 1 : undefined;
    }
}
