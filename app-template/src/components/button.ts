import { Component } from "./component";

export class $Button extends Component {
    private button!: HTMLButtonElement;

    protected override createHtmlElement(): HTMLElement {
        this.button = document.createElement('button');
        
        this.button.addEventListener('click', () => {
            this.triggerEvent('click');
        });

        this.addInputStringListener('label', (value) => {
            this.button.textContent = value ?? '';
        });
        
        return this.button;
    }
}
