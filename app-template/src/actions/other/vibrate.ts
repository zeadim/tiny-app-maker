import { Action } from "../action";

export class $Vibrate extends Action {

    public override async execute(): Promise<number | undefined> {
        const duration = +this.getInput('duration');

        try {
            navigator.vibrate(duration);
        } catch (err) {
            //
        }

        return undefined;
    }
}
