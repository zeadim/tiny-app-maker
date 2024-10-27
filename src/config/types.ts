export type ComponentConfiguration = {
    name: string,
    label: string,
    group?: string,
    inputs: InputConfiguration[],
    events: EventConfiguration[],
};

export type InputConfiguration = {
    name: string,
    label: string,
    type: 'variable' | 'string' | 'number' | 'boolean' | 'color',
    defaultValue?: any,
    defaultVariable?: boolean,
};

export type EventConfiguration = {
    name: string,
    label: string,
};

export type ActionConfiguration = {
    name: string,
    label: string,
    group?: string,
    inputs: InputConfiguration[],
};
