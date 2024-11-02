import { ActionConfiguration } from "../../types";

export const speak: ActionConfiguration = {
    name: 'speak',
    label: 'Speak',
    group: 'other',
    inputs: [
        {
            name: 'text',
            label: 'Text to Say',
            type: 'string',
        },
        {
            name: 'async',
            label: 'Asynchronous',
            type: 'boolean',
            defaultValue: false,
        },
    ],
};
