import { AudioFile } from "../../file-objects/audio-file";
import { VideoFile } from "../../file-objects/video-file";
import { Action } from "../action";

export class $StopAllAudio extends Action {

    public override async execute(): Promise<number | undefined> {
        const audioAddressables = this.app.getAllAddressables('audio');

        window.speechSynthesis.cancel();

        for (const { object } of audioAddressables) {
            if (object instanceof AudioFile || object instanceof VideoFile)
                object.stop();
        }

        return undefined;
    }
}
