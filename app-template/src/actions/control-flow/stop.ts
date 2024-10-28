import { Action } from "../action";

export class $Stop extends Action {

    public override async execute(): Promise<number | undefined> {
        const condition = this.getInputBoolean('condition');

        return !condition ? Number.MAX_SAFE_INTEGER : undefined;
    }
}
