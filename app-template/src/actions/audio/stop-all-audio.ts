import { AudioFile } from "../../file-objects/audio-file";
import { Action } from "../action";

export class $StopAllAudio extends Action {

    public override async execute(): Promise<number | undefined> {
        const audioAddressables = this.app.getAllAddressables('audio');

        for (const { object } of audioAddressables) {
            if (object instanceof AudioFile)
                object.stop();
            else if (object instanceof HTMLAudioElement)
                object.pause();
        }

        return undefined;
    }
}
