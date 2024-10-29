import { ComponentConfiguration } from "../types";

export const textInput: ComponentConfiguration = {
    name: 'text-input',
    label: 'Text Input',
    group: 'input',
    inputs: [
        {
            name: 'placeholder',
            label: 'Placeholder',
            type: 'string',
        },
        {
            name: 'initial-text',
            label: 'Initial Text',
            type: 'string',
        },
        {
            name: 'output-text',
            label: 'Current Text',
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
