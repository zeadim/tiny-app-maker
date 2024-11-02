import { isAddressableId } from "../common";
import { VideoFile } from "../file-objects/video-file";
import { Component } from "./component";

// TODO: exactly the same as $AudioPlayer, but with VideoFile (and 'video' FileType) instead
export class $VideoPlayer extends Component {
    private container!: HTMLDivElement;
    private videoFileForUrl!: VideoFile;
    private activeVideoFile!: VideoFile;
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

        this.videoFileForUrl = new VideoFile(this.app);
        this.setVideoFile(this.videoFileForUrl);
        
        this.currentTimeVariable = this.getInputVariable('output-current-time');
        this.volumeVariable = this.getInputVariable('output-volume');

        this.addInputStringListener('url-or-file-id', (value) => {
            const urlOrFileId = value?.trim() ?? '';
            if (!urlOrFileId)
                return;

            let videoFile: VideoFile;

            if (isAddressableId(urlOrFileId)) {
                const videoFileFromId = this.app.getAddressableObject<VideoFile>(urlOrFileId, 'video');
                if (videoFileFromId) {
                    videoFile = videoFileFromId;
                } else {
                    this.videoFileForUrl.stop();
                    this.videoFileForUrl.loadUrl('');
                    videoFile = this.videoFileForUrl;
                }
            } else {
                this.videoFileForUrl.stop();
                this.videoFileForUrl.loadUrl(urlOrFileId);
                videoFile = this.videoFileForUrl;
            }

            this.setVideoFile(videoFile);
        });

        this.onTimeUpdate = () => {
            this.app.setVariableValue(this.currentTimeVariable, this.activeVideoFile.getCurrentTime());
        };

        this.onVolumeChange = () => {
            const volume = this.activeVideoFile.getVolume();
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
                this.activeVideoFile.setCurrentTime(value);
            } else if (variable === this.volumeVariable) {
                this.activeVideoFile.setVolume(value);
            }
        });

        return this.container;
    }

    private setVideoFile(videoFile: VideoFile): void {
        // Always add event listeners again after src change for it to work!
        //if (this.activeVideoFile === videoFile)
        //    return;

        if (this.activeVideoFile) {
            this.activeVideoFile.videoElement.pause();
            this.activeVideoFile.videoElement.removeEventListener('timeupdate', this.onTimeUpdate);
            this.activeVideoFile.videoElement.removeEventListener('volumechange', this.onVolumeChange);
            this.activeVideoFile.videoElement.removeEventListener('play', this.onPlay);
            this.activeVideoFile.videoElement.removeEventListener('pause', this.onPause);
            this.container.removeChild(this.activeVideoFile.videoElement);
        }
        
        this.activeVideoFile = videoFile;
        this.activeVideoFile.videoElement.addEventListener('timeupdate', this.onTimeUpdate);
        this.activeVideoFile.videoElement.addEventListener('volumechange', this.onVolumeChange);
        this.activeVideoFile.videoElement.addEventListener('play', this.onPlay);
        this.activeVideoFile.videoElement.addEventListener('pause', this.onPause);
        this.container.appendChild(this.activeVideoFile.videoElement);
    }
}
