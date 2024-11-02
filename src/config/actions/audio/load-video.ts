import { ActionConfiguration } from "../../types";

export const loadVideo: ActionConfiguration = {
    name: 'load-video',
    label: 'Load Video',
    group: 'media',
    inputs: [
        {
            name: 'url',
            label: 'Video URL',
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
            label: 'Video File ID',
            type: 'variable',
        }
    ],
};
