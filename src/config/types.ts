export type ComponentConfiguration = {
    type: string,
    label: string,
    group?: string,
    inputs: InputConfiguration[],
    outputs: OutputConfiguration[],
    events: EventConfiguration[],
};

export type InputConfiguration = {
    name: string,
    label: string,
    type: 'variable' | 'string' | 'number' | 'boolean' | 'color',
    default?: any,
    required?: boolean,
};

export type OutputConfiguration = {
    name: string,
    label: string,
    default?: string,
};

export type EventConfiguration = {
    name: string,
    label: string,
};

export type ActionConfiguration = {
    type: string,
    label: string,
    group?: string,
    inputs: InputConfiguration[],
};
