import { ActionConfiguration } from "../../types";

export const assignNumber: ActionConfiguration = {
    name: 'assign-number',
    label: 'Assign Number',
    group: 'assignment',
    inputs: [
        {
            name: 'value',
            label: 'Value',
            type: 'number',
        },
        {
            name: 'output-variable',
            label: 'Value',
            type: 'variable',
        },
    ],
};
