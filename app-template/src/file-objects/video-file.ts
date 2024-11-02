import { App } from "../app";
import { FileObject } from "./file-object";

// TODO: perhaps create abstract superclass "MediaFile" for AudioFile and VideoFile to inherit
// because almost all of it is shared (HTML element is just different)
export class VideoFile extends FileObject {
    public videoElement: HTMLVideoElement;
    private videoUrl?: string;

    public constructor(app: App) {
        super(app);

        this.videoElement = document.createElement('video');
        this.videoElement.preload = 'auto';
        this.videoElement.preservesPitch = false;
        this.videoElement.controls = true;
        this.videoElement.style.width = '100%';
        this.videoElement.style.height = '100%';
    }

    public override async loadFromBlob(blob: Blob): Promise<void> {
        await super.loadFromBlob(blob);
        await this.loadUrl(URL.createObjectURL(blob));
    }

    public async loadUrl(url: string): Promise<void> {
        if (this.videoUrl === url)
            return;

        this.videoUrl = url;
        this.videoElement.src = url;

        return new Promise<void>((resolve) => {
            const onSuccess = () => {
                this.videoElement.removeEventListener('canplay', onSuccess);
                resolve();
            };

            const onError = () => {
                this.videoElement.removeEventListener('error', onError);
                resolve();
            };

            this.videoElement.addEventListener('canplay', onSuccess);
            this.videoElement.addEventListener('error', onError);
        });
    }

    public async play(startOffset: number, loop: boolean): Promise<void> {
        if (this.videoElement.readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
            return;

        const duration = Number.isFinite(this.videoElement.duration) ? this.videoElement.duration : 0;
        this.videoElement.currentTime = Math.max(0, Math.min(startOffset < 0 ? duration - startOffset : startOffset, duration));
        this.videoElement.loop = loop;
        this.videoElement.play();

        if (this.videoElement.ended)
            return;

        await new Promise<void>((resolve) => {
            if (!loop) {
                const onEnded = () => {
                    this.videoElement.removeEventListener('ended', onEnded);
                    resolve();
                };
                this.videoElement.addEventListener('ended', onEnded);
            }

            const onPause = () => {
                this.videoElement.removeEventListener('pause', onPause);
                resolve();
            };
            this.videoElement.addEventListener('pause', onPause);
        });
    }

    public stop(): void {
        this.videoElement.pause();
    }

    public getCurrentTime(): number {
        return this.videoElement.currentTime;
    }
    
    public setCurrentTime(currentTime: number): number {
        return this.videoElement.currentTime = currentTime;
    }

    public getVolume(): number {
        return Math.max(0, Math.min(this.videoElement.volume * 100, 100));
    }

    public setVolume(volume: number): void {
        this.videoElement.volume = Math.max(0.0, Math.min(volume / 100, 1.0));
    }

    public setPlaybackRate(playbackRate: number, preservePitch: boolean): void {
        this.videoElement.preservesPitch = preservePitch;
        this.videoElement.playbackRate = Math.max(0.25, Math.min(playbackRate / 100, 2.0));
    }
}
