import { ComponentConfiguration } from "../types";

export const label: ComponentConfiguration = {
    name: 'label',
    label: 'Label',
    group: 'text',
    inputs: [
        {
            name: 'text',
            label: 'Text',
            type: 'string',
        },
        {
            name: 'font-size',
            label: 'Font Size',
            type: 'number',
            defaultValue: 18,
        },
    ],
    events: [],
};
