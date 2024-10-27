import { ActionConfiguration } from "../../types";

export const goto: ActionConfiguration = {
    name: 'goto',
    label: 'go to',
    group: 'control flow',
    inputs: [
        {
            name: 'index',
            label: 'Action Index',
            type: 'number',
            defaultValue: 1,
        },
        {
            name: 'condition',
            label: 'Condition',
            type: 'boolean',
            defaultValue: true,
        }
    ],
};
