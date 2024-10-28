import { App } from "../../app";
import { InputState } from "../../types";
import { Action } from "../action";

export class $PlayAudio extends Action {
    private audioElement: HTMLAudioElement;
    private sourceUrl?: string;

    public constructor(app: App, inputs: InputState[]) {
        super(app, inputs);

        this.audioElement = new Audio();
        this.audioElement.preload = 'auto';

        // Preload audio if possible
        const url = inputs.find(x => x.name === 'url' && !x.variable)?.value;
        if (typeof url === 'string' && url.trim().length > 0) {
            this.loadAudio(url);
        }
    }

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');

        if (this.sourceUrl !== url) {
            await this.loadAudio(url);
        }

        try {
            if (!this.audioElement.paused) {
                this.audioElement.pause();
                this.audioElement.currentTime = 0;
            }
            
            this.audioElement.play();
        } catch (err) {
            //
        }

        return undefined;
    }

    private loadAudio(url: string): Promise<void> {
        this.sourceUrl = url;
        this.audioElement.src = url;

        return new Promise((resolve) => {
            const onSuccess = () => {
                this.audioElement.removeEventListener('canplay', onSuccess);
                resolve();
            };

            const onError = () => {
                this.audioElement.removeEventListener('error', onError);
                resolve();
            };

            this.audioElement.addEventListener('canplay', onSuccess);
            this.audioElement.addEventListener('error', onError);
        });
    }
}
