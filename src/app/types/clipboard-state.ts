import { ActionState, ComponentState, GlobalEventState } from "./state";

export type ClipboardState = {
    component?: ComponentState,
    action?: ActionState,
    globalEvent?: GlobalEventState,
};
