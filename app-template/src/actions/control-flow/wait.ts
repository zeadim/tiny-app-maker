import { Action } from "../action";

export class $Wait extends Action {

    public override async execute(): Promise<number | undefined> {
        const duration = this.getInput('duration');
        
        await new Promise((resolve) => setTimeout(resolve, duration));

        return undefined;
    }
}
