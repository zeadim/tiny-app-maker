import { ActionConfiguration } from "../../types";

export const playAudio: ActionConfiguration = {
    name: 'play-audio',
    label: 'Play Media',
    group: 'media',
    inputs: [
        {
            name: 'url-or-file-id',
            label: 'Audio/Video URL or File ID',
            type: 'string',
        },
        {
            name: 'start-offset',
            label: 'Time Offset (seconds)',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'loop',
            label: 'Loop',
            type: 'boolean',
            defaultValue: false,
        },
        {
            name: 'async',
            label: 'Play Asynchronously',
            type: 'boolean',
            defaultValue: true,
        },
    ],
};
