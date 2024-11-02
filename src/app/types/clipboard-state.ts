import { ActionState, ComponentState } from "./state";

export type ClipboardState = {
    component: ComponentState,
    action?: ActionState,
};
