import { Component } from "./component";

export class $Cell extends Component {
    private container!: HTMLDivElement;

    protected override createHtmlElement(): HTMLElement {
        this.container = document.createElement('div');

        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'row';

        this.container.addEventListener('pointerdown', () => {
            this.triggerEvent('click');
        });

        this.container.addEventListener('pointerenter', (event) => {
            this.triggerEvent('touch');
        });

        this.addInputStringListener('text', (value) => {
            this.container.textContent = value ?? '';
        });

        this.addInputColorListener('text-color', (value) => {
            this.container.style.color = value ?? '#000000';
        });

        this.addInputNumberListener('text-padding', (value) => {
            this.container.style.padding = `${Math.floor(value ?? 8)}px`;
        });

        this.addInputStringListener('text-horizontal-alignment', (value) => {
            this.container.style.textAlign = value ?? 'center';
        });

        this.addInputStringListener('text-vertical-alignment', (value) => {
            const alignment = value === 'top' ? 'flex-start' : value === 'bottom' ? 'flex-end' : 'center';
            this.container.style.alignItems = alignment;
        });

        this.addInputNumberListener('font-size', (value) => {
            this.container.style.fontSize = `${Math.floor(value ?? 18)}px`;
        });

        this.addInputColorListener('background-color', (value) => {
            this.container.style.backgroundColor = value ?? '#e0eeee';
        });

        return this.container;
    }
}
