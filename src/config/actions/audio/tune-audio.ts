import { ActionConfiguration } from "../../types";

export const tuneAudio: ActionConfiguration = {
    name: 'tune-audio',
    label: 'Tune Audio',
    group: 'audio',
    inputs: [
        {
            name: 'file-id',
            label: 'Audio File ID',
            type: 'string',
            defaultVariable: true,
        },
        {
            name: 'volume',
            label: 'Volume (between 0 and 100)',
            type: 'number', // TODO: slider
            defaultValue: 100,
        },
        /*{
            name: 'pan', // TODO: remove this? since only supported for CORS
            label: 'Pan (between -100 and 100)',
            type: 'number', // TODO: slider
            defaultValue: 0,
        },*/
        {
            name: 'pitch',
            label: 'Pitch (between 0 and 200)',
            type: 'number', // TODO: slider
            defaultValue: 100,
        },
    ],
};
