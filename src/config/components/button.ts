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
        },
    ],
    events: [
        {
            name: 'click',
            label: 'On Click',
        },
    ],
};
