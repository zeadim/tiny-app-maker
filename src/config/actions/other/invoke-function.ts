import { ActionConfiguration } from "../../types";

export const invokeFunction: ActionConfiguration = {
    name: 'invoke-function',
    label: 'Invoke Function',
    group: 'other',
    inputs: [
        {
            name: 'function-name',
            label: 'Function Name',
            type: 'string',
        },
        {
            name: 'async',
            label: 'Asynchronous',
            type: 'boolean',
            defaultValue: false,
        }
    ],
};
