import { Component } from "./component";

export class $TextInput extends Component {
    private input!: HTMLInputElement;
    private outputVariable!: string;
    private initialValueSet!: boolean;

    protected override createHtmlElement(): HTMLElement {
        this.input = document.createElement('input');

        this.input.setAttribute('type', 'text');
        this.input.style.minWidth = '0';
        this.input.style.minHeight = '0';

        this.outputVariable = this.getInputString('output-text');
        this.initialValueSet = false;

        // setTimeout to let variable values be propagated once
        setTimeout(() => this.initialValueSet = true, 0);

        this.addInputStringListener('placeholder', (value) => {
            this.input.setAttribute('placeholder', value ?? '');
        });

        this.addInputStringListener('initial-text', (value) => {
            if (this.initialValueSet)
                return;

            this.input.value = value ?? '';
            this.updateOutputVariable();
        });

        this.app.addEventListener('update', (event) => {
            const { variable, value } = (event as CustomEvent).detail;

            if (variable === this.outputVariable)
                this.input.value = value;
        });

        this.input.addEventListener('input', () => {
            this.updateOutputVariable();
        });

        return this.input;
    }

    private updateOutputVariable(): void {
        this.app.setVariableValue(this.outputVariable, this.input.value);
    }
}
