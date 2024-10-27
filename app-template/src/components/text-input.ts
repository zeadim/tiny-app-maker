import { Component } from "./component";

export class $TextInput extends Component {
    private input!: HTMLInputElement;
    
    protected override createHtmlElement(): HTMLElement {
        this.input = document.createElement('input');

        this.input.setAttribute('type', 'text');
        this.input.style.minWidth = '0';
        this.input.style.minHeight = '0';
        
        this.input.addEventListener('input', () => {
            this.updateOutputText();
        });

        this.addInputStringListener('text', (value) => {
            if (this.input.value === value)
                return;

            this.input.value = value;
            this.updateOutputText();
        });

        this.addInputStringListener('placeholder', (value) => {
            this.input.setAttribute('placeholder', value);
        });
        
        return this.input;
    }

    private updateOutputText(): void {
        const outputVariable = this.getInputString('output-text');
        this.app.setVariableValue(outputVariable, this.input.value);
    }
}
