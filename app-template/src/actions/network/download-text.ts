import { getAcceptedMimeTypesFromFileType } from "../../common";
import { Action } from "../action";

export class $DownloadText extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const outputVariable = this.getInputVariable('output-text-content');

        let output = '';

        try {
            const response = await fetch(url, {
                headers: {
                    'accept': getAcceptedMimeTypesFromFileType('text'),
                },
            });

            if (!response.ok)
                return undefined;
            
            output = await response.text();
        } catch (err) {
            return undefined;
        }

        this.app.setVariableValue(outputVariable, output);

        return undefined;
    }
}
