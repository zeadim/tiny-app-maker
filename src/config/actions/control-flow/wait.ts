import { ActionConfiguration } from "../../types";

export const wait: ActionConfiguration = {
    name: 'wait',
    label: 'Wait',
    group: 'control flow',
    inputs: [
        {
            name: 'duration',
            label: 'Duration (milliseconds)',
            type: 'number',
            defaultValue: 1000,
        },
    ],
};
