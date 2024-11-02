import { isAddressableId } from "../common";
import { AudioFile } from "../file-objects/audio-file";
import { Component } from "./component";

export class $AudioPlayer extends Component {
    private container!: HTMLDivElement;
    private audioFileForUrl!: AudioFile;
    private activeAudioFile!: AudioFile;
    private currentTimeVariable!: string;
    private volumeVariable!: string;

    private onTimeUpdate!: (event: Event) => unknown;
    private onVolumeChange!: (event: Event) => unknown;
    private onPlay!: (event: Event) => unknown;
    private onPause!: (event: Event) => unknown;

    protected override createHtmlElement(): HTMLElement {
        this.container = document.createElement('div');
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'row';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.audioFileForUrl = new AudioFile(this.app);
        this.setAudioFile(this.audioFileForUrl);
        
        this.currentTimeVariable = this.getInputVariable('output-current-time');
        this.volumeVariable = this.getInputVariable('output-volume');

        this.addInputStringListener('url-or-file-id', (value) => {
            const urlOrFileId = value?.trim() ?? '';
            if (!urlOrFileId)
                return;

            let audioFile: AudioFile;

            if (isAddressableId(urlOrFileId)) {
                const audioFileFromId = this.app.getAddressableObject<AudioFile>(urlOrFileId, 'audio');
                if (audioFileFromId) {
                    audioFile = audioFileFromId;
                } else {
                    this.audioFileForUrl.stop();
                    this.audioFileForUrl.loadUrl('');
                    audioFile = this.audioFileForUrl;
                }
            } else {
                this.audioFileForUrl.stop();
                this.audioFileForUrl.loadUrl(urlOrFileId);
                audioFile = this.audioFileForUrl;
            }

            this.setAudioFile(audioFile);
        });

        this.onTimeUpdate = () => {
            this.app.setVariableValue(this.currentTimeVariable, this.activeAudioFile.getCurrentTime());
        };

        this.onVolumeChange = () => {
            const volume = this.activeAudioFile.getVolume();
            this.app.setVariableValue(this.volumeVariable, Math.round(volume));
        };

        this.onPlay = () => {
            this.triggerEvent('play');
        };

        this.onPause = () => {
            this.triggerEvent('pause');
        }

        this.app.addEventListener('update', (event) => {
            const { variable, value } = (event as CustomEvent).detail;
            if (value === undefined)
                return;

            if (variable === this.currentTimeVariable) {
                this.activeAudioFile.setCurrentTime(value);
            } else if (variable === this.volumeVariable) {
                this.activeAudioFile.setVolume(value);
            }
        });

        return this.container;
    }

    private setAudioFile(audioFile: AudioFile): void {
        // Always add event listeners again after src change for it to work!
        //if (this.activeAudioFile === audioFile)
        //    return;

        if (this.activeAudioFile) {
            this.activeAudioFile.audioElement.pause();
            this.activeAudioFile.audioElement.removeEventListener('timeupdate', this.onTimeUpdate);
            this.activeAudioFile.audioElement.removeEventListener('volumechange', this.onVolumeChange);
            this.activeAudioFile.audioElement.removeEventListener('play', this.onPlay);
            this.activeAudioFile.audioElement.removeEventListener('pause', this.onPause);
            this.container.removeChild(this.activeAudioFile.audioElement);
        }
        
        this.activeAudioFile = audioFile;
        this.activeAudioFile.audioElement.addEventListener('timeupdate', this.onTimeUpdate);
        this.activeAudioFile.audioElement.addEventListener('volumechange', this.onVolumeChange);
        this.activeAudioFile.audioElement.addEventListener('play', this.onPlay);
        this.activeAudioFile.audioElement.addEventListener('pause', this.onPause);
        this.container.appendChild(this.activeAudioFile.audioElement);
    }
}
