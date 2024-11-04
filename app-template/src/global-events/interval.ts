import { GlobalEvent } from "./global-event";

export class $Interval extends GlobalEvent {

    private timeout?: number;
    private interval!: number;
    private async!: boolean;
    private promise!: Promise<void>;

    protected setUp(): void {
        const immediate = this.getInputBoolean('immediate');

        this.async = this.getInputBoolean('async');
        this.promise = Promise.resolve();

        this.addInputNumberListener('interval', async (value) => {
            this.interval = value ?? 1;

            if (!this.async)
                await this.promise;

            this.startNext();
        });

        this.addInputBooleanListener('async', (value) => {
            this.async = !!value;
        });

        this.startFirst(immediate);
    }

    private async startFirst(immediate: boolean): Promise<void> {
        if (immediate) {
            this.promise = this.triggerEvent('interval');

            if (!this.async)
                await this.promise;
        }

        this.startNext();
    }

    private startNext(): void {
        window.clearTimeout(this.timeout);
        
        this.timeout = window.setTimeout(async () => {
            this.promise = this.triggerEvent('interval');

            if (!this.async)
                await this.promise;

            this.startNext();
        }, this.interval * 1000);
    }
}
