import { ComponentConfiguration } from "../types";

export const button: ComponentConfiguration = {
    type: 'button',
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
    outputs: [],
    events: [
        {
            name: 'click',
            label: 'On Click',
        },
    ],
};
