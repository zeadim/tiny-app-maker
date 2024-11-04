import { GlobalEventConfiguration } from "../types";

export const variableChange: GlobalEventConfiguration = {
    name: 'variable-change',
    label: 'Variable Change',
    group: '',
    inputs: [
        {
            name: 'variable-name',
            label: 'Variable Name',
            type: 'variable', // TODO: should actually really be "variable" that can be "variable"-ized as well
        },
    ],
    events: [],
};
