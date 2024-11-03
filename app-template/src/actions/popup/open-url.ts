import { Action } from "../action";

export class $OpenUrl extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const openInNewTab = this.getInputBoolean('open-in-new-tab');

        if (openInNewTab)
            window.open(url, '_blank');
        else
            window.location.href = url;
        
        return undefined;
    }
}
