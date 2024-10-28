import { Action } from "../action";

export class $PauseAudio extends Action {

    public override async execute(): Promise<number | undefined> {
        const id = this.getInputString('id');
        const reset = this.getInputBoolean('reset');

        try {
            const audioElement = this.app.getAddressableObject<HTMLAudioElement>(id, 'audio');
            audioElement?.pause();

            if (reset && audioElement)
                audioElement.currentTime = 0;
        } catch (err) {
            //
        }

        return undefined;
    }
}
