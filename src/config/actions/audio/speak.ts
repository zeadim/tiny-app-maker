import { ActionConfiguration } from "../../types";

export const speak: ActionConfiguration = {
    name: 'speak',
    label: 'Speak',
    group: 'audio',
    inputs: [
        {
            name: 'text',
            label: 'Text to Say',
            type: 'string',
        },
    ],
};
