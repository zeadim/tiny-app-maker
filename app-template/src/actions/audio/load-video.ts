import { App } from "../../app";
import { AudioFile } from "../../file-objects/audio-file";
import { VideoFile } from "../../file-objects/video-file";
import { InputState } from "../../types";
import { Action } from "../action";

export class $LoadVideo extends Action {
    private videoFile?: VideoFile;
    private firstExecution: boolean;
    private fileIdVariable: string;

    public constructor(app: App, inputs: InputState[]) {
        super(app, inputs);

        this.firstExecution = true;
        this.fileIdVariable = this.getInputVariable('output-file-id');
    }

    public override async execute(): Promise<number | undefined> {
        const audioUrl = this.getInputString('url');
        const async = this.getInputBoolean('async');

        if (this.firstExecution) {
            this.videoFile = new VideoFile(this.app);
            const addressable = this.app.createAddressable('video', this.videoFile);
            this.app.setVariableValue(this.fileIdVariable, addressable.id);
            this.firstExecution = false;
        }

        try {
            const promise = this.videoFile?.loadUrl(audioUrl);

            if (!async)
                await promise;
        } catch (err) {
            //
        }

        return undefined;
    }
}
