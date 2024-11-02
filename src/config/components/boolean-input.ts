import { ComponentConfiguration } from "../types";

export const booleanInput: ComponentConfiguration = {
    name: 'boolean-input',
    label: 'Checkbox',
    group: 'input',
    inputs: [
        {
            name: 'initial-boolean',
            label: 'Initial Value',
            type: 'boolean',
        },
        {
            name: 'output-boolean',
            label: 'Current Value',
            type: 'variable',
        },
    ],
    events: [
        {
            name: 'change',
            label: 'On Change',
        }
    ],
};
