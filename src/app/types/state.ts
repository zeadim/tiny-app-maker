export type State = {
    width: number,
    height: number,
    components: ComponentState[],
};

export type ComponentState = {
    type: string,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    inputs: InputState[],
    outputs: OutputState[],
    events: EventState[],
};

export type InputState = {
    name: string,
    value: any,
    variable: boolean,
};

export type OutputState = {
    name: string,
    value?: string,
};

export type EventState = {
    name: string,
    actions: ActionState[],
};

export type ActionState = {
    type: string,
    inputs: InputState[],
};
