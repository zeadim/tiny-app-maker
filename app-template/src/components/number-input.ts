import { Component } from "./component";

export class $NumberInput extends Component {
    private input!: HTMLInputElement;
    private outputVariable!: string;
    private initialValueSet!: boolean;
    private currentValue!: string;

    protected override createHtmlElement(): HTMLElement {
        this.input = document.createElement('input');

        this.input.setAttribute('type', 'number');
        this.input.setAttribute('step', 'any');
        this.input.style.minWidth = '0';
        this.input.style.minHeight = '0';

        this.outputVariable = this.getInputVariable('output-number');
        this.initialValueSet = false;
        this.currentValue = '';

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
            this.updateInputValue(this.input.value);
            this.updateOutputVariable();
        });

        return this.input;
    }

    private updateInputValue(value: string | number | undefined): void {
        if (typeof value === 'string') {
            this.currentValue = value;
        } else {
            this.currentValue = Number.isFinite(value) ? value!.toString() : '';
        }

        if (this.input.value !== this.currentValue) {
            this.input.value = this.currentValue;
        }
    }

    private updateOutputVariable(): void {
        const value = this.input.valueAsNumber;
        this.app.setVariableValue(this.outputVariable, Number.isFinite(value) ? value : undefined);
    }
}
