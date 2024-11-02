import { AudioFile } from "../../file-objects/audio-file";
import { VideoFile } from "../../file-objects/video-file";
import { Action } from "../action";

export class $ChangeVolume extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');
        const volume = this.getInputNumber('volume');

        let mediaFile: AudioFile | VideoFile | undefined;
        mediaFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio') ?? this.app.getAddressableObject<VideoFile>(fileId, 'video');
        mediaFile?.setVolume(volume);

        return undefined;
    }
}
