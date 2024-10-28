import { ActionConfiguration } from "../../types";

export const loadAudio: ActionConfiguration = {
    name: 'load-audio',
    label: 'Load Audio',
    group: 'audio',
    inputs: [
        {
            name: 'url',
            label: 'Audio URL',
            type: 'string',
        },
        {
            name: 'autoplay',
            label: 'Autoplay',
            type: 'boolean',
            defaultValue: true,
        },
        {
            name: 'async',
            label: 'Play Asynchronously',
            note: 'If autoplay',
            type: 'boolean',
            defaultValue: true,
        },
        {
            name: 'output-audio',
            label: 'Audio ID',
            type: 'variable',
        },
    ],
};
