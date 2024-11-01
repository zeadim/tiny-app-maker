import { ActionConfiguration } from "../../types";

export const vibrate: ActionConfiguration = {
    name: 'vibrate',
    label: 'Vibrate',
    group: 'other',
    inputs: [
        {
            name: 'duration',
            label: 'Duration (milliseconds)',
            note: 'Mobile Only',
            type: 'number',
            defaultValue: 200,
        },
    ],
};
