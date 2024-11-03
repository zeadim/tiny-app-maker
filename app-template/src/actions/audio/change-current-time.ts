import { AudioFile } from "../../file-objects/audio-file";
import { VideoFile } from "../../file-objects/video-file";
import { Action } from "../action";

export class $ChangeCurrentTime extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');
        const currentTime = this.getInputNumber('current-time');

        let mediaFile: AudioFile | VideoFile | undefined;
        mediaFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio') ?? this.app.getAddressableObject<VideoFile>(fileId, 'video');
        mediaFile?.setCurrentTime(currentTime);

        return undefined;
    }
}
