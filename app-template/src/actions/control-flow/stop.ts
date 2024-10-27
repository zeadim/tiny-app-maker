import { Action } from "../action";

export class $Stop extends Action {

    public override async execute(): Promise<number | undefined> {
        return Number.MAX_SAFE_INTEGER;
    }
}
