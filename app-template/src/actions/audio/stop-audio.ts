import { AudioFile } from "../../file-objects/audio-file";
import { Action } from "../action";

export class $StopAudio extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');
        const currentTimeVariable = this.getInputVariable('output-current-time');

        try {
            const audioFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio');
            if (!audioFile)
                return;

            audioFile.stop();
            this.app.setVariableValue(currentTimeVariable, audioFile.audioElement.currentTime);
        } catch (err) {
            //
        }

        return undefined;
    }
}
