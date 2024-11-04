import { GlobalEvent } from "./global-event";

export class $VariableChange extends GlobalEvent {

    private variableName!: string;

    protected setUp(): void {
        this.variableName = '';

        this.addInputStringListener('variable-name', (value) => {
            this.variableName = value?.toUpperCase() ?? '';
        });

        this.app.addEventListener('update', (event) => {
            const { variable } = (event as CustomEvent).detail;

            if (variable === this.variableName) {
                this.triggerEvent('change');
            }
        });
    }
}
