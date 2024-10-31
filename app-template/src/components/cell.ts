import { Component } from "./component";

export class $Cell extends Component {
    private cell!: HTMLDivElement;
    private textContainer!: HTMLDivElement;

    protected override createHtmlElement(): HTMLElement {
        this.cell = document.createElement('div');
        this.textContainer = document.createElement('div');
        this.cell.appendChild(this.textContainer);

        this.cell.style.display = 'flex';
        this.cell.style.flexDirection = 'row';
        this.textContainer.style.display = 'inline-block';
        this.textContainer.style.flex = '1';

        this.cell.addEventListener('click', () => {
            this.triggerEvent('click');
        });

        this.addInputStringListener('text', (value) => {
            this.textContainer.textContent = value ?? '';
        });

        this.addInputColorListener('text-color', (value) => {
            this.cell.style.color = value ?? '#000000';
        });

        this.addInputNumberListener('text-padding', (value) => {
            this.cell.style.padding = `${Math.floor(value ?? 8)}px`;
        });

        this.addInputStringListener('text-horizontal-alignment', (value) => {
            this.cell.style.textAlign = value ?? 'center';
        });

        this.addInputStringListener('text-vertical-alignment', (value) => {
            const alignment = value === 'top' ? 'flex-start' : value === 'bottom' ? 'flex-end' : 'center';
            this.cell.style.alignItems = alignment;
        });

        this.addInputNumberListener('font-size', (value) => {
            this.cell.style.fontSize = `${Math.floor(value ?? 18)}px`;
        });

        this.addInputColorListener('background-color', (value) => {
            this.cell.style.backgroundColor = value ?? '#e0eeee';
        });

        return this.cell;
    }
}
