import { ActionConfiguration } from "../../types";

export const vibrate: ActionConfiguration = {
    name: 'vibrate',
    label: 'Vibrate',
    group: 'other',
    inputs: [
        {
            name: 'duration',
            label: 'Vibration Duration (milliseconds)',
            type: 'number',
            default: 200,
        },
    ],
};
