import { AudioFile } from "../../file-objects/audio-file";
import { VideoFile } from "../../file-objects/video-file";
import { Action } from "../action";

export class $ChangePlaybackRate extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');
        const playbackRate = this.getInputNumber('playback-rate');
        const preservePitch = this.getInputBoolean('preserve-pitch');

        let mediaFile: AudioFile | VideoFile | undefined;
        mediaFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio') ?? this.app.getAddressableObject<VideoFile>(fileId, 'video');
        mediaFile?.setPlaybackRate(playbackRate, preservePitch);

        return undefined;
    }
}
