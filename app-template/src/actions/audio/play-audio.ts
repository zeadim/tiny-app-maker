import { App } from "../../app";
import { isAddressableId } from "../../common";
import { AudioFile } from "../../file-objects/audio-file";
import { InputState } from "../../types";
import { Action } from "../action";

export class $PlayAudio extends Action {
    private audioFile?: AudioFile;

    public constructor(app: App, inputs: InputState[]) {
        super(app, inputs);

        // Preload audio if possible
        setTimeout(() => {
            const url = this.getInputString('url-or-file-id');
            if (!isAddressableId(url)) {
                this.audioFile = new AudioFile(this.app);
                this.audioFile.loadUrl(url);
                this.app.createAddressable('audio', this.audioFile);
            }
        });
    }

    public override async execute(): Promise<number | undefined> {
        const urlOrFileId = this.getInputString('url-or-file-id');
        const startOffset = this.getInputNumber('start-offset');
        const loop = this.getInputBoolean('loop');
        const async = this.getInputBoolean('async');

        let audioFile: AudioFile;

        if (isAddressableId(urlOrFileId)) {
            const audioFileFromId = this.app.getAddressableObject<AudioFile>(urlOrFileId, 'audio');
            if (!audioFileFromId)
                return;

            audioFile = audioFileFromId;
        } else {
            if (!this.audioFile) {
                this.audioFile = new AudioFile(this.app);
                this.app.createAddressable('audio', this.audioFile);
            }

            this.audioFile.stop();
            await this.audioFile.loadUrl(urlOrFileId);

            audioFile = this.audioFile;
        }

        try {
            const promise = audioFile.play(startOffset, loop);

            if (!async)
                await promise;
        } catch (err) {
            //
        }

        return undefined;
    }
}
