import { ActionConfiguration } from "../../types";

export const playAudio: ActionConfiguration = {
    name: 'play-audio',
    label: 'Play Audio',
    group: 'audio',
    inputs: [
        {
            name: 'id',
            label: 'Audio URL / Audio ID / File ID',
            type: 'string',
            defaultVariable: true,
        },
        {
            name: 'restart',
            label: 'Restart From Beginning',
            type: 'boolean',
            defaultValue: true,
        },
        {
            name: 'async',
            label: 'Play Asynchronously',
            type: 'boolean',
            defaultValue: true,
        },
    ],
};
