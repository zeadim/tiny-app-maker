import { ActionConfiguration } from "../../types";

export const changePlaybackRate: ActionConfiguration = {
    name: 'change-playback-rate',
    label: 'Change Playback Rate',
    group: 'media',
    inputs: [
        {
            name: 'file-id',
            label: 'Audio/Video File ID',
            type: 'string',
            defaultVariable: true,
        },
        {
            name: 'playback-rate',
            label: 'Playback Rate (% between 0 and 200)',
            type: 'number', // TODO: slider
            defaultValue: 100,
        },
        {
            name: 'preserve-pitch',
            label: 'Preserve Pitch',
            type: 'boolean',
            defaultValue: false,
        },
    ],
};
