import { AudioFile } from "../../file-objects/audio-file";
import { VideoFile } from "../../file-objects/video-file";
import { Action } from "../action";

export class $StopAudio extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');
        const currentTimeVariable = this.getInputVariable('output-current-time');

        try {
            let mediaFile: AudioFile | VideoFile | undefined;
            mediaFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio') ?? this.app.getAddressableObject<VideoFile>(fileId, 'video');
            if (!mediaFile)
                return;

            mediaFile.stop();
            this.app.setVariableValue(currentTimeVariable, mediaFile.getCurrentTime());
        } catch (err) {
            //
        }

        return undefined;
    }
}
