import { App } from "../app";
import { EventState, InputState } from "../types";
import { InputListenerActionSource } from "../input-listener-action-source";

export class GlobalEvent extends InputListenerActionSource {

    public constructor(app: App, inputs: InputState[], events: EventState[]) {
        super(app, inputs, events);

        this.setUp();

        this.notifyInitialInputUpdates();
    }

    protected setUp(): void {
        //
    }
}
