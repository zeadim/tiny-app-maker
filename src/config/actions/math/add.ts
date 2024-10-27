import { ActionConfiguration } from "../../types";

export const add: ActionConfiguration = {
    name: 'add',
    label: 'Add',
    group: 'math',
    inputs: [
        {
            name: 'value1',
            label: 'Value 1',
            type: 'number',
        },
        {
            name: 'value2',
            label: 'Value 2',
            type: 'number',
        },
        {
            name: 'result',
            label: 'Result',
            type: 'variable',
        }
    ],
};
