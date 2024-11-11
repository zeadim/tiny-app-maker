import { GlobalEventConfiguration } from "../types";

export const invocation: GlobalEventConfiguration = {
    name: 'invocation',
    label: 'On Function Call',
    group: '',
    inputs: [
        {
            name: 'name',
            label: 'Function Name',
            type: 'string',
        }
    ],
    events: [
        {
            name: 'invoke',
            label: 'On Call',
        }
    ],
};
