import { Component } from "../component";

export class $TextInput extends Component {
    private input!: HTMLInputElement;
    
    protected override createHtmlElement(): HTMLElement {
        this.input = document.createElement('input');

        this.input.setAttribute('type', 'text');
        this.input.style.minWidth = '0';
        this.input.style.minHeight = '0';
        
        this.input.addEventListener('input', () => {
            const outputVariable = this.getInput('output-text');
            this.app.setVariableValue(outputVariable, this.input.value);
        });
        
        return this.input;
    }

    protected override onInputUpdate(name: string, value: any): void {
        if (name === 'text') {
            this.input.value = value;
        }

        if (name === 'placeholder') {
            this.input.setAttribute('placeholder', value);
        }
    }
}
