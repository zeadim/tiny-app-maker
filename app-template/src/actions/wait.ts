import { Action } from "../action";

export class $Wait extends Action {

    public override async execute(): Promise<boolean> {
        const duration = this.getInput('duration');
        await new Promise((resolve) => setTimeout(resolve, duration));
        return false;
    }
}
