import { ActionConfiguration } from "../../types";

export const assignColor: ActionConfiguration = {
    name: 'assign-color',
    label: 'Assign Color',
    group: 'assignment',
    inputs: [
        {
            name: 'value',
            label: 'Value',
            type: 'color',
        },
        {
            name: 'output-variable',
            label: 'Value',
            type: 'variable',
        },
    ],
};
