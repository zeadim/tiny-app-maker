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
        this.container.style.position = 'relative';

        const iframe = document.createElement('iframe');
        this.container.appendChild(iframe);

        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', 'true');

        // Determine the level of iframe-inception
        let level = 0;
        let win: Window | null = window;
        while (win !== null && win !== win.parent) {
            level += 1;
            win = win.parent;
        }

        iframe.style.width = `calc(100% + ${level * 2}px)`;
        iframe.style.height = `calc(100% + ${level * 2}px)`;
        iframe.style.position = 'absolute';
        iframe.style.top = `-${level}px`;
        iframe.style.left = `-${level}px`;

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
