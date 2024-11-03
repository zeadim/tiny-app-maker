import { ComponentConfiguration } from "../types";

export const cell: ComponentConfiguration = {
    name: 'cell',
    label: 'Cell',
    group: '',
    inputs: [
        {
            name: 'background-color',
            label: 'Background Color',
            type: 'color',
            defaultValue: '#e0eeee',
        },
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
            name: 'text-alignment',
            label: 'Text Alignment',
            type: 'options',
            options: [
                { value: 'top-left', label: 'Top Left'},
                { value: 'top-center', label: 'Top Center'},
                { value: 'top-right', label: 'Top Right'},
                { value: 'center-left', label: 'Center Left'},
                { value: 'center-center', label: 'Center Center'},
                { value: 'center-right', label: 'Center Right'},
                { value: 'bottom-left', label: 'Bottom Left'},
                { value: 'bottom-center', label: 'Bottom Center'},
                { value: 'bottom-right', label: 'Bottom Right'},
            ],
            defaultValue: 'center-center',
        },
        {
            name: 'text-style',
            label: 'Text Style',
            type: 'options',
            options: [
                { value: 'normal', label: 'Normal' },
                { value: 'bold', label: 'Bold' },
                { value: 'italic', label: 'Italic' },
                { value: 'underline', label: 'Underline' },
            ],
            defaultValue: 'normal',
        },
        {
            name: 'font-size',
            label: 'Text Font Size',
            type: 'number',
            defaultValue: 16,
        },
    ],
    events: [
        {
            name: 'click',
            label: 'On Click',
        },
    ],
};
