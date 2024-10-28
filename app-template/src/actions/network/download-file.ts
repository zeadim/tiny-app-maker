import { AddressableType } from "../../types";
import { Action } from "../action";

export class $DownloadFile extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const outputVariable = this.getInputString('output-file-id');

        let type: AddressableType = 'nothing';
        let object;

        try {
            const response = await fetch(url);

            if (response.ok) {
                const blob = await response.blob();
                ([type, object] = await this.parseBlob(blob));
            }
        } catch (err) {
            //
        }

        const addressable = this.app.createAddressable(type, object);
        this.app.setVariableValue(outputVariable, addressable.id);

        return undefined;
    }

    private async parseBlob(blob: Blob): Promise<[AddressableType, any]> {
        if (blob.type === 'application/json') {
            const json = await blob.text();
            const data = JSON.parse(json);
            return ['json', data];
        }

        if (blob.type.startsWith('text/')) {
            const text = await blob.text();
            return ['text', text];
        }

        if (blob.type.startsWith('image/')) {
            const image = new Image();
            image.src = URL.createObjectURL(blob);
            return ['image', image];
        }

        if (blob.type.startsWith('audio/')) {
            const audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            return ['audio', audio];
        }

        if (blob.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(blob);
            return ['video', video];
        }

        return ['unknown', blob];
    }
}
