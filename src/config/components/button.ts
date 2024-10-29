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
    ],
    events: [
        {
            name: 'click',
            label: 'On Click',
        },
    ],
};
