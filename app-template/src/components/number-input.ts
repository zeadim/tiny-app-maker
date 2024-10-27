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

        this.addInputListener('number', (value) => {
            if (this.input.valueAsNumber === value)
                return;

            this.input.value = value ?? 0;
            this.updateOutputNumber();
        });

        this.addInputListener('placeholder', (value) => {
            this.input.setAttribute('placeholder', value ?? '');
        });
        
        return this.input;
    }

    private updateOutputNumber(): void {
        const outputVariable = this.getInput('output-number');
        this.app.setVariableValue(outputVariable, this.input.valueAsNumber);
    }
}
