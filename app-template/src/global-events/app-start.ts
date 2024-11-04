import { GlobalEvent } from "./global-event";

export class $AppStart extends GlobalEvent {

    protected setUp(): void {
        this.triggerEvent('start');
    }
}
