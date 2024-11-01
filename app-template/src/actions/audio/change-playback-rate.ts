import { AudioFile } from "../../file-objects/audio-file";
import { Action } from "../action";

export class $ChangePlaybackRate extends Action {

    public override async execute(): Promise<number | undefined> {
        const fileId = this.getInputString('file-id');
        const playbackRate = this.getInputNumber('playback-rate');
        const preservePitch = this.getInputBoolean('preserve-pitch');

        const audioFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio');
        
        audioFile?.setPlaybackRate(playbackRate, preservePitch);

        return undefined;
    }
}
