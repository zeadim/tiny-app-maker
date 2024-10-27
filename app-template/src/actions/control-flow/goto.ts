import { Action } from "../action";

export class $GoTo extends Action {

    public override async execute(): Promise<number | undefined> {
        const index = +this.getInput('index');
        const condition = !!this.getInput('condition');
        
        return condition ? index : undefined;
    }
}
