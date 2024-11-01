import { ActionConfiguration } from "../../types";

export const playAudio: ActionConfiguration = {
    name: 'play-audio',
    label: 'Play Audio',
    group: 'audio',
    inputs: [
        {
            name: 'url-or-file-id',
            label: 'Audio URL or File ID',
            type: 'string',
        },
        {
            name: 'start-offset',
            label: 'Start Time Offset (seconds)',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'loop',
            label: 'Loop (restart automatically)',
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
