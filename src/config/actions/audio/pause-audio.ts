import { ActionConfiguration } from "../../types";

export const pauseAudio: ActionConfiguration = {
    name: 'pause-audio',
    label: 'Pause Audio',
    group: 'audio',
    inputs: [
        {
            name: 'id',
            label: 'Audio / File ID',
            type: 'string',
            defaultVariable: true,
        },
        {
            name: 'reset',
            label: 'Reset to beginning',
            type: 'boolean',
            defaultValue: false,
        },
    ],
};
