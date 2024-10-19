import { ActionConfiguration } from "../types";

export const wait: ActionConfiguration = {
    type: 'wait',
    label: 'Wait',
    group: 'control',
    inputs: [
        {
            name: 'duration',
            label: 'Duration (milliseconds)',
            type: 'number',
            default: 1000,
        },
    ],
};
