import { ActionConfiguration } from "../../types";

export const stopAudio: ActionConfiguration = {
    name: 'stop-audio',
    label: 'Stop Audio',
    group: 'audio',
    inputs: [
        {
            name: 'file-id',
            label: 'Audio File ID',
            type: 'string',
            defaultVariable: true,
        },
    ],
};
