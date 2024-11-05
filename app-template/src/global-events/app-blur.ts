import { GlobalEvent } from "./global-event";

export class $AppBlur extends GlobalEvent {

    protected setUp(): void {
        window.addEventListener('blur', () => {
            this.triggerEvent('blur');
        });
    }
}
