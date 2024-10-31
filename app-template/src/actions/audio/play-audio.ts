import { App } from "../../app";
import { AudioFile } from "../../file-objects/audio-file";
import { InputState } from "../../types";
import { Action } from "../action";

export class $PlayAudio extends Action {
    private audioElement!: HTMLAudioElement;
    private audioUrl?: string;

    public constructor(app: App, inputs: InputState[]) {
        super(app, inputs);

        this.audioElement = new Audio();
        this.audioElement.preload = 'auto';

        // Preload audio if possible
        setTimeout(() => {
            const url = this.getInputString('url-or-file-id').trim();
            if (!url.startsWith('id:'))
                this.loadAudioUrl(url);
        });
    }

    public override async execute(): Promise<number | undefined> {
        const urlOrFileId = this.getInputString('url-or-file-id').trim();
        const startOffset = this.getInputNumber('start-offset');
        const async = this.getInputBoolean('async');

        if (!urlOrFileId)
            return undefined;

        try {
            if (urlOrFileId.startsWith('id:')) {
                await this.playFromFile(urlOrFileId, startOffset, async);
            } else {
                await this.playFromUrl(urlOrFileId, startOffset, async);
            }
        } catch (err) {
            //
        }

        return undefined;
    }

    private async loadAudioUrl(url: string): Promise<void> {
        if (this.audioUrl === url)
            return;

        if (this.audioUrl === undefined)
            this.app.createAddressable('audio', this.audioElement);

        this.audioUrl = url;

        return new Promise((resolve) => {
            const onSuccess = () => {
                this.audioElement.removeEventListener('canplaythrough', onSuccess);
                resolve();
            };

            const onError = () => {
                this.audioElement.removeEventListener('error', onError);
                resolve();
            };

            this.audioElement.src = this.audioUrl!;
            this.audioElement.addEventListener('canplaythrough', onSuccess);
            this.audioElement.addEventListener('error', onError);
        });
    }

    private async playFromUrl(url: string, startOffset: number, async: boolean): Promise<void> {
        if (!this.audioElement.paused)
            this.audioElement.pause();

        await this.loadAudioUrl(url);

        const duration = Number.isFinite(this.audioElement.duration) ? this.audioElement.duration : 0;
        this.audioElement.currentTime = Math.max(0, Math.min(startOffset < 0 ? duration - startOffset : startOffset, duration));
        this.audioElement.play();

        if (!async && !this.audioElement.ended) {
            await new Promise<void>((resolve) => {
                this.audioElement.onended = () => {
                    this.audioElement.pause();
                    this.audioElement.src = '';
                    resolve();
                };
            });
        }
    }

    private async playFromFile(fileId: string, startOffset: number, async: boolean): Promise<void> {
        const audioFile = this.app.getAddressableObject<AudioFile>(fileId, 'audio');
        if (!audioFile)
            return;

        const promise = audioFile.play(startOffset);
        if (!async)
            await promise;
    }
}
