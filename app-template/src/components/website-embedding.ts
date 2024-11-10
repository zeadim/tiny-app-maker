import { Component } from "./component";

export class $WebsiteEmbedding extends Component {
    private container!: HTMLDivElement;
    private websiteUrl?: string;

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

        this.addInputStringListener('url', (value) => {
            this.websiteUrl = value ?? '';

            if (iframe.src !== this.websiteUrl)
                iframe.src = this.websiteUrl;
        });
        
        this.addInputNumberListener('zoom', (value) => {
            iframe.style.zoom = `${Math.max(0, value ?? 1)}`;
        });

        return this.container;
    }
}
