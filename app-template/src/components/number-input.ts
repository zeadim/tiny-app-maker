import { Component } from "./component";

export class $NumberInput extends Component {
    private input!: HTMLInputElement;
    
    protected override createHtmlElement(): HTMLElement {
        this.input = document.createElement('input');

        this.input.setAttribute('type', 'number');
        this.input.style.minWidth = '0';
        this.input.style.minHeight = '0';
        
        this.input.addEventListener('input', () => {
            this.updateOutputNumber();
        });

        this.addInputNumberListener('number', (value) => {
            if (this.input.valueAsNumber === value)
                return;

            this.input.valueAsNumber = value;
            this.updateOutputNumber();
        });

        this.addInputStringListener('placeholder', (value) => {
            this.input.setAttribute('placeholder', value);
        });
        
        return this.input;
    }

    private updateOutputNumber(): void {
        const outputVariable = this.getInputString('output-number');
        this.app.setVariableValue(outputVariable, this.input.valueAsNumber);
    }
}
