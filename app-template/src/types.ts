export type State = {
    width: number,
    height: number,
    components: ComponentState[],
};

export type ComponentState = {
    name: string,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    inputs: InputState[],
    events: EventState[],
};

export type InputState = {
    name: string,
    value: any,
    variable: boolean,
};

export type EventState = {
    name: string,
    actions: ActionState[],
};

export type ActionState = {
    name: string,
    inputs: InputState[],
};
