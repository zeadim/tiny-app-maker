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

        this.addInputColorListener('background-color', (value) => {
            this.cell.style.backgroundColor = value ?? '#e0eeee';
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

        this.addInputStringListener('text-alignment', (value) => {
            switch (value) {
                case 'top-left':
                    this.cell.style.textAlign = 'left';
                    this.cell.style.alignItems = 'flex-start';
                    break;

                case 'top-center':
                    this.cell.style.textAlign = 'center';
                    this.cell.style.alignItems = 'flex-start';
                    break;

                case 'top-right':
                    this.cell.style.textAlign = 'right';
                    this.cell.style.alignItems = 'flex-start';
                    break;

                case 'center-left':
                    this.cell.style.textAlign = 'left';
                    this.cell.style.alignItems = 'center';
                    break;

                default:
                    this.cell.style.textAlign = 'center';
                    this.cell.style.alignItems = 'center';
                    break;

                case 'center-right':
                    this.cell.style.textAlign = 'right';
                    this.cell.style.alignItems = 'center';
                    break;

                case 'bottom-left':
                    this.cell.style.textAlign = 'left';
                    this.cell.style.alignItems = 'flex-end';
                    break;

                case 'bottom-center':
                    this.cell.style.textAlign = 'center';
                    this.cell.style.alignItems = 'flex-end';
                    break;

                case 'bottom-right':
                    this.cell.style.textAlign = 'right';
                    this.cell.style.alignItems = 'flex-end';
                    break;
            }
        });

        this.addInputStringListener('text-style', (value) => {
            switch (value) {
                default:
                    this.cell.style.fontWeight = 'normal';
                    this.cell.style.fontStyle = 'normal';
                    this.cell.style.textDecoration = 'none';
                    break;

                case 'bold':
                    this.cell.style.fontWeight = 'bold';
                    this.cell.style.fontStyle = 'normal';
                    this.cell.style.textDecoration = 'none';
                    break;

                case 'italic':
                    this.cell.style.fontWeight = 'normal';
                    this.cell.style.fontStyle = 'italic';
                    this.cell.style.textDecoration = 'none';
                    break;

                case 'underline':
                    this.cell.style.fontWeight = 'normal';
                    this.cell.style.fontStyle = 'normal';
                    this.cell.style.textDecoration = 'underline';
                    break;
            }
        });

        this.addInputNumberListener('font-size', (value) => {
            this.cell.style.fontSize = `${Math.floor(value ?? 18)}px`;
        });

        return this.cell;
    }
}
