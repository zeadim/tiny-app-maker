import { ComponentConfiguration } from "../types";

export const button: ComponentConfiguration = {
    name: 'button',
    label: 'Button',
    group: 'button',
    inputs: [
        {
            name: 'label',
            label: 'Label',
            type: 'string',
            required: false,
        },
    ],
    events: [
        {
            name: 'click',
            label: 'On Click',
        },
    ],
};
