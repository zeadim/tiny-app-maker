import { GlobalEventConfiguration } from "../types";

export const variableChange: GlobalEventConfiguration = {
    name: 'variable-change',
    label: 'On Variable Change',
    group: '',
    inputs: [
        {
            name: 'variable-name',
            label: 'Variable Name',
            type: 'string', // TODO: should actually really be "variable" input that can be "variable"-ized as well
        },
    ],
    events: [
        {
            name: 'change',
            label: 'On Change'
        }
    ],
};
