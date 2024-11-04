import { GlobalEvent } from "./global-event";

export class $Interval extends GlobalEvent {

    private interval?: number;

    protected setUp(): void {

        this.addInputNumberListener('interval', (value) => {
            const seconds = value ?? 1;

            window.clearInterval(this.interval);
            this.interval = window.setInterval(() => {
                this.triggerEvent('interval');
            }, seconds * 1000)
        });
    }
}
