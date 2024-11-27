import { ActionConfiguration } from "../../types";

export const assignBoolean: ActionConfiguration = {
    name: 'assign-boolean',
    label: 'Assign Boolean',
    group: 'assignment',
    inputs: [
        {
            name: 'value',
            label: 'Value',
            type: 'boolean',
        },
        {
            name: 'output-variable',
            label: 'Value',
            type: 'variable',
        },
    ],
};
