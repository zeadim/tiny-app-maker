import { App } from "../app";
import { FileObject } from "./file-object";

// TODO: add loop support
export class AudioFile extends FileObject {
    public audioElement: HTMLAudioElement;

    /*private sourceNode: MediaElementAudioSourceNode;
    private pannerNode: StereoPannerNode;*/
    private audioUrl?: string;

    public constructor(app: App) {
        super(app);

        this.audioElement = document.createElement('audio');
        this.audioElement.preload = 'auto';
        this.audioElement.preservesPitch = false;
        this.audioElement.controls = true;
        this.audioElement.style.width = '100%';

        // TODO: if no CORS, then this (createMediaElementSource) prevents audio from playing it seems
        // so might not want to use audioContext, or at least only when coming from proper file (input or download)

        /*this.sourceNode = this.app.audioContext.createMediaElementSource(this.audioElement);
        this.pannerNode = this.app.audioContext.createStereoPanner();
        this.sourceNode.connect(this.pannerNode);
        this.pannerNode.connect(this.app.audioContext.destination);*/
    }

    public override async loadFromBlob(blob: Blob): Promise<void> {
        await super.loadFromBlob(blob);
        await this.loadUrl(URL.createObjectURL(blob));
    }

    public async loadUrl(url: string): Promise<void> {
        if (this.audioUrl === url)
            return;

        this.audioUrl = url;
        this.audioElement.src = url;

        return new Promise<void>((resolve) => {
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

    public async play(startOffset: number, loop: boolean): Promise<void> {
        if (this.audioElement.readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
            return;

        const duration = Number.isFinite(this.audioElement.duration) ? this.audioElement.duration : 0;
        this.audioElement.currentTime = Math.max(0, Math.min(startOffset < 0 ? duration - startOffset : startOffset, duration));
        this.audioElement.loop = loop;
        this.audioElement.play();

        if (this.audioElement.ended)
            return;

        await new Promise<void>((resolve) => {
            if (!loop) {
                const onEnded = () => {
                    this.audioElement.removeEventListener('ended', onEnded);
                    resolve();
                };
                this.audioElement.addEventListener('ended', onEnded);
            }

            const onPause = () => {
                this.audioElement.removeEventListener('pause', onPause);
                resolve();
            };
            this.audioElement.addEventListener('pause', onPause);
        });
    }

    public stop(): void {
        this.audioElement.pause();
    }

    public getCurrentTime(): number {
        return Math.floor(this.audioElement.currentTime * 100) / 100;
    }
    
    public setCurrentTime(currentTime: number): void {
        const time = Math.floor(this.audioElement.currentTime * 100) / 100;
        if (time !== currentTime)
            this.audioElement.currentTime = currentTime;
    }


    public getVolume(): number {
        const volume = Math.pow(this.audioElement.volume, 0.5);
        return Math.max(0, Math.min(volume * 100, 100));
    }

    public setVolume(volume: number): void {
        const value = Math.max(0.0, Math.min(volume / 100, 1.0));
        this.audioElement.volume = Math.pow(value, 2);
    }

    public getPlaybackRate(): number {
        return Math.max(0, Math.min(this.audioElement.playbackRate * 100, 200));
    }

    public setPlaybackRate(playbackRate: number, preservePitch: boolean): void {
        this.audioElement.preservesPitch = preservePitch;
        this.audioElement.playbackRate = Math.max(0.25, Math.min(playbackRate / 100, 2.0));
    }
}
