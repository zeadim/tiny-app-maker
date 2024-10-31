import { App } from "../../app";
import { AudioFile } from "../../file-objects/audio-file";
import { InputState } from "../../types";
import { Action } from "../action";

export class $LoadAudio extends Action {
    private audioFile?: AudioFile;
    private firstExecution: boolean;
    private fileIdVariable: string;

    public constructor(app: App, inputs: InputState[]) {
        super(app, inputs);

        this.firstExecution = true;
        this.fileIdVariable = this.getInputString('output-file-id');
    }

    public override async execute(): Promise<number | undefined> {
        const audioUrl = this.getInputString('url');
        const async = this.getInputBoolean('async');

        if (this.firstExecution) {
            this.audioFile = new AudioFile(this.app);
            const addressable = this.app.createAddressable('audio', this.audioFile);
            this.app.setVariableValue(this.fileIdVariable, addressable.id);
            this.firstExecution = false;
        }

        try {
            const promise = this.audioFile?.loadUrl(audioUrl);

            if (!async)
                await promise;
        } catch (err) {
            //
        }

        return undefined;
    }
}
