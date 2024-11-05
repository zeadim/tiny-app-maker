import { GlobalEvent } from "./global-event";

export class $Invocation extends GlobalEvent {

    private functionName?: string;
    private functionListener!: () => unknown;

    protected setUp(): void {
        this.functionListener = async () => {
            await this.triggerEvent('invoke');
        };

        this.addInputStringListener('name', (value) => {
            const previousName = this.functionName ?? '';
            this.app.removeFunctionListener(previousName, this.functionListener);

            this.functionName = value ?? '';
            this.app.addFunctionListener(this.functionName, this.functionListener);
        });
    }
}
