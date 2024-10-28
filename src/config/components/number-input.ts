import { ComponentConfiguration } from "../types";

export const numberInput: ComponentConfiguration = {
    name: 'number-input',
    label: 'Number Input',
    group: 'input',
    inputs: [
        {
            name: 'placeholder',
            label: 'Placeholder',
            type: 'string',
        },
        {
            name: 'initial-number',
            label: 'Initial Number',
            type: 'number',
        },
        {
            name: 'output-number',
            label: 'Current Number',
            type: 'variable',
        },
    ],
    events: [],
};
