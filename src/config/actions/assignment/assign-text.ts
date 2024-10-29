import { ActionConfiguration } from "../../types";

export const assignText: ActionConfiguration = {
    name: 'assign-text',
    label: 'Assign Text',
    group: 'assignment',
    inputs: [
        {
            name: 'value',
            label: 'Value',
            type: 'string',
        },
        {
            name: 'output-variable',
            label: 'Value',
            type: 'variable',
        },
    ],
};
