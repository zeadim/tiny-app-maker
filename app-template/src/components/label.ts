import { Component } from "./component";

export class $Label extends Component {
    private container!: HTMLDivElement;
    
    protected override createHtmlElement(): HTMLElement {
        this.container = document.createElement('div');
        
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'row';
        this.container.style.alignItems = 'center';
        this.container.style.padding = '8px';
        this.container.style.color = 'black';
        this.container.style.backgroundColor = 'white';

        this.addInputStringListener('text', (value) => {
            this.container.textContent = value ?? '';
        });
        
        this.addInputNumberListener('font-size', (value) => {
            this.container.style.fontSize = `${Math.floor(value ?? 18)}px`;
        });
        
        return this.container;
    }
}
