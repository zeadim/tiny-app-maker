import { ComponentConfiguration } from "../types";

export const cell: ComponentConfiguration = {
    name: 'cell',
    label: 'Cell',
    group: '',
    inputs: [
        {
            name: 'text',
            label: 'Text Content',
            type: 'string',
        },
        {
            name: 'text-color',
            label: 'Text Color',
            type: 'color',
            defaultValue: '#000000',
        },
        {
            name: 'text-padding',
            label: 'Text Padding',
            type: 'number',
            defaultValue: 8,
        },
        {
            name: 'text-horizontal-alignment',
            label: 'Text Horizontal Alignment',
            type: 'options',
            options: [
                { value: 'left', label: 'Left'},
                { value: 'center', label: 'Center'},
                { value: 'right', label: 'Right'},
            ],
            defaultValue: 'center',
        },
        {
            name: 'text-vertical-alignment',
            label: 'Text Vertical Alignment',
            type: 'options',
            options: [
                { value: 'top', label: 'Top'},
                { value: 'center', label: 'Center'},
                { value: 'bottom', label: 'Bottom'},
            ],
            defaultValue: 'center',
        },
        {
            name: 'font-size',
            label: 'Text Font Size',
            type: 'number',
            defaultValue: 18,
        },
        {
            name: 'background-color',
            label: 'Background Color',
            type: 'color',
            defaultValue: '#e0eeee',
        },
    ],
    events: [
        {
            name: 'click',
            label: 'On Click',
        },
        {
            name: 'touch',
            label: 'On Touch',
        },
    ],
};
