import { App } from "../../app";
import { InputState } from "../../types";
import { Action } from "../action";

export class $LoadAudio extends Action {
    private audioElement: HTMLAudioElement;
    private url?: string;

    public constructor(app: App, inputs: InputState[]) {
        super(app, inputs);

        this.audioElement = new Audio();
        this.audioElement.preload = 'auto';

        const outputVariable = this.getInputString('output-audio');
        if (outputVariable) {
            const addressable = this.app.createAddressable('audio', this.audioElement);
            this.app.setVariableValue(outputVariable, addressable.id); // TODO: create abstraction for this?
        }

        // Preload audio if possible
        setTimeout(() => {
            const url = this.getInputString('url');
            this.loadAudio(url);
        });
    }

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const autoplay = this.getInputBoolean('autoplay');
        const async = this.getInputBoolean('async');

        try {
            if (this.url !== url)
                await this.loadAudio(url);

            if (!this.audioElement.paused) {
                this.audioElement.pause();
                this.audioElement.currentTime = 0;
            }

            if (autoplay) {
                this.audioElement.play();

                if (!async && !this.audioElement.ended) {
                    await new Promise<void>((resolve) => {
                        const onEnded = () => {
                            this.audioElement.removeEventListener('ended', onEnded);
                            resolve();
                        };

                        this.audioElement.addEventListener('ended', onEnded);
                    });
                }
            }
        } catch (err) {
            //
            throw err;
        }

        return undefined;
    }

    private async loadAudio(url: string): Promise<void> {
        this.url = url;

        return new Promise((resolve) => {
            const onSuccess = () => {
                this.audioElement.removeEventListener('canplay', onSuccess);
                resolve();
            };

            const onError = () => {
                this.audioElement.removeEventListener('error', onError);
                resolve();
            };

            this.audioElement.src = this.url!;
            this.audioElement.addEventListener('canplay', onSuccess);
            this.audioElement.addEventListener('error', onError);
        });
    }
}
