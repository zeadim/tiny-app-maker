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
            name: 'value',
            label: 'Value',
            type: 'string',
            required: false,
        },
    ],
    outputs: [
        {
            name: 'text',
            label: 'current text',
        },
    ],
    events: [],
};
