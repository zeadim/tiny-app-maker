import { Component } from "../component";

export class $Button extends Component {
    private button!: HTMLButtonElement;

    protected override createHtmlElement(): HTMLElement {
        this.button = document.createElement('button');
        
        this.button.addEventListener('click', async () => {
            await this.triggerEvent('click');
        });
        
        return this.button;
    }

    protected override onInputUpdate(name: string, value: any): void {
        if (name === 'label') {
            this.button.textContent = value;
        }
    }
}
