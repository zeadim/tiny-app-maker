import { App } from "../../app";
import { isAddressableId } from "../../common";
import { AudioFile } from "../../file-objects/audio-file";
import { VideoFile } from "../../file-objects/video-file";
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

        let mediaFile: AudioFile | VideoFile;

        if (isAddressableId(urlOrFileId)) {
            let file: AudioFile | VideoFile | undefined;
            file = this.app.getAddressableObject<AudioFile>(urlOrFileId, 'audio') ?? this.app.getAddressableObject<VideoFile>(urlOrFileId, 'video');
            if (!file)
                return;

            mediaFile = file;
        } else {
            if (!this.audioFile) {
                this.audioFile = new AudioFile(this.app);
                this.app.createAddressable('audio', this.audioFile);
            }

            this.audioFile.stop();
            await this.audioFile.loadUrl(urlOrFileId);

            mediaFile = this.audioFile;
        }

        try {
            const promise = mediaFile.play(startOffset, loop);

            if (!async)
                await promise;
        } catch (err) {
            //
        }

        return undefined;
    }
}
