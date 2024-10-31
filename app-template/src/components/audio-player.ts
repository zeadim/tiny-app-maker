import { isAddressableId } from "../common";
import { AudioFile } from "../file-objects/audio-file";
import { Component } from "./component";

export class $AudioPlayer extends Component {
    private container!: HTMLDivElement;
    private audioElement!: HTMLAudioElement;
    private audioFile?: AudioFile;
    private audioElementPlaceholder!: HTMLAudioElement;

    protected override createHtmlElement(): HTMLElement {
        this.container = document.createElement('div');
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'row';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.audioElementPlaceholder = document.createElement('audio');
        this.audioElement = this.audioElementPlaceholder;
        this.audioElement.controls = true;
        this.container.appendChild(this.audioElement);

        this.addInputStringListener('url-or-file-id', (value) => {
            const urlOrFileId = value?.trim() ?? '';
            if (!urlOrFileId)
                return;

            let audioElement: HTMLAudioElement;

            if (isAddressableId(urlOrFileId)) {
                const audioFileFromId = this.app.getAddressableObject<AudioFile>(urlOrFileId, 'audio');
                if (!audioFileFromId) {
                    audioElement = this.audioElementPlaceholder;
                    return;
                } else {
                    audioElement = audioFileFromId.audioElement;
                }
            } else {
                if (!this.audioFile)
                    this.audioFile = new AudioFile(this.app);

                this.audioFile.stop();
                this.audioFile.loadUrl(urlOrFileId);

                audioElement = this.audioFile.audioElement;
            }

            if (this.audioElement !== audioElement) {
                this.audioElement.pause();
                this.container.removeChild(this.audioElement);
                this.audioElement = audioElement;
                this.container.appendChild(this.audioElement);
            }
        });

        return this.container;
    }
}
