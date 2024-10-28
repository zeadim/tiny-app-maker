import { Action } from "../action";

export class $PlayAudio extends Action {

    public override async execute(): Promise<number | undefined> {
        const id = this.getInputString('id');
        const restart = this.getInputBoolean('restart');
        const async = this.getInputBoolean('async');

        try {
            const audioElement = this.app.getAddressableObject<HTMLAudioElement>(id, 'audio');
            if (!audioElement)
                return undefined;
            
            if (!audioElement.paused && !audioElement.ended)
                audioElement.pause();

            if (restart)
                audioElement.currentTime = 0;

            audioElement.play();

            if (!async && !audioElement.ended) {
                await new Promise<void>((resolve) => {
                    const onEnded = () => {
                        audioElement.removeEventListener('ended', onEnded);
                        resolve();
                    };

                    audioElement.addEventListener('ended', onEnded);
                });
            }
        } catch (err) {
            //
        }

        return undefined;
    }
}
