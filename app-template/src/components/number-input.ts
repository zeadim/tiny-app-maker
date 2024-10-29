import { Component } from "./component";

export class $NumberInput extends Component {
    private input!: HTMLInputElement;
    private outputVariable!: string;
    private initialValueSet!: boolean;

    protected override createHtmlElement(): HTMLElement {
        this.input = document.createElement('input');

        this.input.setAttribute('type', 'number');
        this.input.style.minWidth = '0';
        this.input.style.minHeight = '0';

        this.outputVariable = this.getInputString('output-number');
        this.initialValueSet = false;

        // setTimeout to let variable values be propagated once
        setTimeout(() => this.initialValueSet = true, 0);

        this.addInputStringListener('placeholder', (value) => {
            this.input.setAttribute('placeholder', value ?? '');
        });

        this.addInputNumberListener('initial-number', (value) => {
            if (this.initialValueSet)
                return;

            this.updateInputValue(value);
            this.updateOutputVariable();
        });

        this.app.addEventListener('update', (event) => {
            const { variable, value } = (event as CustomEvent).detail;

            if (variable === this.outputVariable) {
                this.updateInputValue(value);
                this.triggerEvent('change');
            }
        });

        this.input.addEventListener('input', () => {
            this.updateOutputVariable();
        });

        return this.input;
    }

    private updateInputValue(value: number | undefined): void {
        if (value === undefined)
            this.input.value = '';
        else
            this.input.valueAsNumber = value;
    }

    private updateOutputVariable(): void {
        const value = this.input.valueAsNumber;
        this.app.setVariableValue(this.outputVariable, Number.isFinite(value) ? value : undefined);
    }
}
