import { App } from "../../app";
import { isAddressableId } from "../../common";
import { AudioFile } from "../../file-objects/audio-file";
import { InputState } from "../../types";
import { Action } from "../action";

export class $TuneAudio extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');
        const volume = this.getInputNumber('volume');
        const pan = this.getInputNumber('pan');
        const pitch = this.getInputNumber('pitch');

        const audioFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio');
        
        audioFile?.setVolume(volume);
        audioFile?.setPan(pan);
        audioFile?.setPitch(pitch);

        return undefined;
    }
}
