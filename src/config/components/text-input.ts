import { ComponentConfiguration } from "../types";

export const textInput: ComponentConfiguration = {
    type: 'text input',
    label: 'Text Input',
    group: 'input',
    inputs: [
        {
            name: 'placeholder',
            label: 'Placeholder',
            type: 'string',
            required: false,
        },
        {
            name: 'text',
            label: 'Text',
            type: 'string',
            required: false,
        },
        {
            name: 'output-text',
            label: 'Current Text',
            type: 'variable',
        },
    ],
    events: [],
};
