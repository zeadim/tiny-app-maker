import { AudioFile } from "../../file-objects/audio-file";
import { Action } from "../action";

export class $StopAudio extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');

        try {
            const audioFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio');
            audioFile?.stop();
        } catch (err) {
            //
        }

        return undefined;
    }
}
