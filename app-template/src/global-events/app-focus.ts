import { GlobalEvent } from "./global-event";

export class $AppFocus extends GlobalEvent {

    protected setUp(): void {
        window.addEventListener('focus', () => {
            this.triggerEvent('focus');
        });
    }
}
