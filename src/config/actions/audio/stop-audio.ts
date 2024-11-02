import { ActionConfiguration } from "../../types";

export const stopAudio: ActionConfiguration = {
    name: 'stop-audio',
    label: 'Stop Media',
    group: 'media',
    inputs: [
        {
            name: 'file-id',
            label: 'Audio/Video File ID',
            type: 'string',
            defaultVariable: true,
        },
        {
            name: 'output-current-time',
            label: 'Current Time',
            type: 'variable',
        },
    ],
};
