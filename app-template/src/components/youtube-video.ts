import { Component } from "./component";

export class $YouTubeVideo extends Component {
    private container!: HTMLDivElement;
    private videoUrl?: string;
    private startTime: number = 0;

    protected override createHtmlElement(): HTMLElement {
        this.container = document.createElement('div');

        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'row';
        this.container.style.justifyContent = 'center';
        this.container.style.alignItems = 'center';

        const iframe = document.createElement('iframe');
        this.container.appendChild(iframe);

        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.style.width = '100%';
        iframe.style.height = '100%';

        this.addInputStringListener('youtube-url-or-id', (value) => {
            let id = '';
            try {
                const { search } = new URL(value ?? '');
                const parameters = new URLSearchParams(search?.slice(1));
                id = parameters.get('v') ?? '';
            } catch (err){
                id = value ?? '';
            }

            this.videoUrl = `https://www.youtube.com/embed/${id}`;

            const src = `${this.videoUrl}?start=${this.startTime}`;
            if (iframe.src !== src)
                iframe.src = src;
        });

        this.addInputNumberListener('start-offset', (value) => {
            if (!this.videoUrl)
                return;

            this.startTime = value ?? 0;

            const src = `${this.videoUrl}?start=${this.startTime}`;
            if (iframe.src !== src)
                iframe.src = src;
        });
        
        return this.container;
    }
}
