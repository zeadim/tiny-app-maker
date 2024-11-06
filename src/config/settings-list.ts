import { InputConfiguration } from "./types";

export const settingsList: InputConfiguration[] = [
    {
        name: 'grid-width',
        label: 'Grid Width (number of tiles)',
        type: 'number',
        defaultValue: 6,
        alwaysConstant: true,
    },
    {
        name: 'grid-height',
        label: 'Grid Height (number of tiles)',
        type: 'number',
        defaultValue: 10,
        alwaysConstant: true,
    },
    {
        name: 'container-width',
        label: 'Container Width (pixels)',
        note: 'optional',
        type: 'number',
    },
    {
        name: 'container-height',
        label: 'Container Height (pixels)',
        note: 'optional',
        type: 'number',
    },
    {
        name: 'container-padding',
        label: 'Container Padding (pixels)',
        type: 'number',
        defaultValue: 0,
    },
    {
        name: 'background-color',
        label: 'Background Color',
        type: 'color',
        defaultValue: '#FFFFFF',
    },
    {
        name: 'theme-color',
        label: 'Theme Color',
        type: 'color',
        defaultValue: '#EEF4F4',
    },
    {
        name: 'ui-theme',
        label: 'UI Theme',
        type: 'options',
        options: [
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Blocky', value: 'blocky' },
            { label: 'Minimalist', value: 'minimalist' },
        ],
        defaultValue: 'vanilla',
    },
];
