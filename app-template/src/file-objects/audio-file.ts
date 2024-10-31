import { FileObject } from "./file-object";

export class AudioFile extends FileObject {
    private audioBufferLoadingPromise?: Promise<void>;
    private audioBuffer?: AudioBuffer;
    private pannerNode!: StereoPannerNode;
    private gainNode!: GainNode;
    private primaryBufferSourceNode?: AudioBufferSourceNode;
    private otherBufferSourceNodes: AudioBufferSourceNode[] = [];

    public override async loadFromBlob(blob: Blob): Promise<void> {
        await super.loadFromBlob(blob);
        const arrayBuffer = await blob.arrayBuffer();

        // start loading audio buffer asynchronously
        this.loadAudioBuffer(arrayBuffer);
    }

    private async loadAudioBuffer(arrayBuffer: ArrayBuffer): Promise<void> {
        if (this.audioBufferLoadingPromise)
            return;

        this.audioBufferLoadingPromise = new Promise(async (resolve) => {
            // TODO: is it possible to have same functionality without decoding all audio data, ie via createMediaElementSource)?
            // Could be used for "audio url" audio as well + HTML5 audio player (https://stackoverflow.com/a/13416719)
            // Though createMediaElementSource might not support playing source multiple times simultaneously?
            this.audioBuffer = await this.app.audioContext.decodeAudioData(arrayBuffer);

            this.pannerNode = this.app.audioContext.createStereoPanner();
            this.gainNode = this.app.audioContext.createGain();

            this.pannerNode?.connect(this.gainNode);
            this.gainNode.connect(this.app.audioContext.destination);

            resolve();
        });
    }

    public async play(startOffset: number): Promise<void> {
        if (!this.audioBufferLoadingPromise)
            return;

        if (!this.audioBuffer)
            await this.audioBufferLoadingPromise;

        if (this.primaryBufferSourceNode)
            this.otherBufferSourceNodes.push(this.primaryBufferSourceNode);

        const duration = this.audioBuffer!.duration;
        const offset = Math.max(0, Math.min(startOffset < 0 ? duration - startOffset : startOffset, duration));

        this.primaryBufferSourceNode = this.app.audioContext.createBufferSource();
        this.primaryBufferSourceNode.buffer = this.audioBuffer!;
        this.primaryBufferSourceNode.connect(this.pannerNode);
        this.primaryBufferSourceNode.start(0, offset);

        return new Promise<void>((resolve) => {
            const source = this.primaryBufferSourceNode!;

            source.onended = () => {
                if (this.primaryBufferSourceNode === source) {
                    this.primaryBufferSourceNode = undefined;
                } else {
                    const index = this.otherBufferSourceNodes.indexOf(source);
                    if (index >= 0)
                        this.otherBufferSourceNodes.splice(index, 1);
                }

                resolve();
            };
        });
    }

    public stop(): void {
        if (!this.audioBuffer)
            return;

        this.primaryBufferSourceNode?.stop();
        for (const source of this.otherBufferSourceNodes)
            source.stop();

        this.primaryBufferSourceNode = undefined;
        this.otherBufferSourceNodes = [];
    }
}
