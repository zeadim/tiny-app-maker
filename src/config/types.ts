export type ComponentConfiguration = {
    name: string,
    label: string,
    group?: string,
    inputs: InputConfiguration[],
    events: EventConfiguration[],
};

export type GlobalEventConfiguration = ComponentConfiguration;

export type InputConfiguration = {
    name: string,
    label: string,
    note?: string,
    type: 'variable' | 'boolean' | 'string' | 'number' | 'color' | 'datetime' | 'time' | 'options',
    defaultValue?: any,
    defaultVariable?: boolean,
    alwaysConstant?: boolean,

    // boolean only
    trueLabel?: string,
    falseLabel?: string,

    // options only
    options?: { label: string, value: any }[],
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
