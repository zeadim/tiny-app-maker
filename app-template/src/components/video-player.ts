import { Component } from "./component";

export class $VideoPlayer extends Component {
    private container!: HTMLDivElement;
    private videoElement!: HTMLVideoElement;
    private videoUrl?: string;

    protected override createHtmlElement(): HTMLElement {
        this.container = document.createElement('div');
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'row';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        this.videoElement = document.createElement('video');
        this.videoElement.controls = true;
        this.videoElement.style.width = '100%';
        this.videoElement.style.height = '100%';
        this.container.appendChild(this.videoElement);

        this.addInputStringListener('url', (value) => {
            const url = value?.trim() ?? '';
            if (url === this.videoUrl)
                return;

            this.videoUrl = url;
            this.videoElement.src = this.videoUrl;
        });

        this.videoElement.addEventListener('play', () => {
            this.triggerEvent('play');
        });

        this.videoElement.addEventListener('pause', () => {
            this.triggerEvent('pause');
        });

        return this.container;
    }
}
