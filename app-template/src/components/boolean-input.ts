import { Component } from "./component";

export class $BooleanInput extends Component {
    private input!: HTMLInputElement;
    private outputVariable!: string;
    private initialValueSet!: boolean;

    protected override createHtmlElement(): HTMLElement {
        this.input = document.createElement('input');

        this.input.setAttribute('type', 'checkbox');
        this.input.style.minWidth = '0';
        this.input.style.minHeight = '0';
        this.input.style.transform = 'scale(1.5)';
        this.input.style.justifySelf = 'center';
        this.input.style.alignSelf = 'center';

        this.outputVariable = this.getInputVariable('output-boolean');
        this.initialValueSet = false;

        // setTimeout to let variable values be propagated once
        setTimeout(() => this.initialValueSet = true, 0);

        this.addInputBooleanListener('initial-boolean', (value) => {
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

    private updateInputValue(value: boolean | undefined): void {
        this.input.checked = !!value;
    }

    private updateOutputVariable(): void {
        this.app.setVariableValue(this.outputVariable, this.input.checked);
    }
}
