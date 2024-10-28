import { App } from "../../app";
import { Action } from "../action";

export class $DownloadText extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const outputVariable = this.getInputString('output-text-content');

        let output: string;
        try {
            const response = await fetch(url, {
                headers: {
                    'accept': 'text/plain'
                },
            });

            output = response.ok ? await response.text() : '';
        } catch (err) {
            output = '';
        }

        this.app.setVariableValue(outputVariable, output);

        return undefined;
    }
}
