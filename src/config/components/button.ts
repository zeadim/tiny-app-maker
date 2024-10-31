import { ComponentConfiguration } from "../types";

export const button: ComponentConfiguration = {
    name: 'button',
    label: 'Button',
    group: 'button',
    inputs: [
        {
            name: 'label',
            label: 'Text Label',
            type: 'string',
        },
        {
            name: 'disabled',
            label: 'Disabled',
            type: 'boolean',
            defaultValue: false,
        },
    ],
    events: [
        {
            name: 'click',
            label: 'On Click',
        },
    ],
};
