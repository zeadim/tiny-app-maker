import { ActionConfiguration } from "../../types";

export const stop: ActionConfiguration = {
    name: 'stop',
    label: 'Stop',
    group: 'control flow',
    inputs: [
        {
            name: 'condition',
            label: 'Only Stop If Not',
            type: 'boolean',
            defaultValue: false,
        },
    ],
};
