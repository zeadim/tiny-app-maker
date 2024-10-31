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
            name: 'async',
            label: 'Load Asynchronously',
            type: 'boolean',
            defaultValue: false,
        },
        {
            name: 'output-file-id',
            label: 'Audio File ID',
            type: 'variable',
        }
    ],
};
