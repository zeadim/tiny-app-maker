import { AudioFile } from "../../file-objects/audio-file";
import { Action } from "../action";

export class $ChangeVolume extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');
        const volume = this.getInputNumber('volume');

        const audioFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio');
        
        audioFile?.setVolume(volume);

        return undefined;
    }
}
