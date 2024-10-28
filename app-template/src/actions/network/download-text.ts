import { Action } from "../action";

export class $DownloadText extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const outputVariable = this.getInputString('output-text-content');

        let output = '';

        try {
            const response = await fetch(url, {
                headers: {
                    'accept': 'text/plain'
                },
            });

            if (response.ok)
                output = await response.text();
        } catch (err) {
            //
        }

        this.app.setVariableValue(outputVariable, output);

        return undefined;
    }
}
