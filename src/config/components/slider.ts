import { ComponentConfiguration } from "../types";

export const slider: ComponentConfiguration = {
    name: 'slider',
    label: 'Slider',
    group: 'input',
    inputs: [
        {
            name: 'initial-value',
            label: 'Initial Value',
            type: 'number',
        },
        {
            name: 'min-value',
            label: 'Minimum Value',
            type: 'number',
        },
        {
            name: 'max-value',
            label: 'Maximum Value',
            type: 'number',
        },
        {
            name: 'output-value',
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
