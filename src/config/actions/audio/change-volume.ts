import { ActionConfiguration } from "../../types";

export const changeVolume: ActionConfiguration = {
    name: 'change-volume',
    label: 'Change Volume',
    group: 'media',
    inputs: [
        {
            name: 'file-id',
            label: 'Audio/Video File ID',
            type: 'string',
            defaultVariable: true,
        },
        {
            name: 'volume',
            label: 'Volume (between 0 and 100)',
            type: 'number', // TODO: slider
            defaultValue: 100,
        },
    ],
};
