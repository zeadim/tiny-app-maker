import { Action } from "../action";

export class $InvokeFunction extends Action {

    public override async execute(): Promise<number | undefined> {
        const functionName = this.getInputString('function-name');
        const async = this.getInputBoolean('async');

        const promise = this.app.invokeFunction(functionName);
        if (!async)
            await promise;

        return undefined;
    }
}
