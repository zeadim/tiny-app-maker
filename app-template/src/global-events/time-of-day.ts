import { GlobalEvent } from "./global-event";

export class $TimeOfDay extends GlobalEvent {

    private timeout?: number;

    protected setUp(): void {
        this.addInputStringListener('time', async (value) => {
            window.clearTimeout(this.timeout);

            const parts = (value ?? '00:00:00').split(':').map(x => parseInt(x));
            const hours = parts[0] ? parts[0] : 0;
            const minutes = parts[1] ? parts[1] : 0;
            const seconds = parts[2] ? parts[2] : 0;

            const startTime = new Date();
            startTime.setHours(hours, minutes, seconds);
            const now = new Date();

            // increase timepoint by 24 hours if in the past
            if (startTime.getTime() < now.getTime()) {
                startTime.setHours(startTime.getHours() + 24);
            }

            const firstTriggerAfterMs = startTime.getTime() - now.getTime();
            this.timeout = window.setTimeout(() => this.trigger(), firstTriggerAfterMs);
        });
    }

    private trigger(): void {
        this.triggerEvent('alarm');

        this.timeout = window.setTimeout(() => this.trigger(), 24 * 60 * 60 * 1000);
    }
}
