import { ActionConfiguration } from "../../types";

export const changeCurrentTime: ActionConfiguration = {
    name: 'change-current-time',
    label: 'Change Current Time',
    group: 'media',
    inputs: [
        {
            name: 'file-id',
            label: 'Audio/Video File ID',
            type: 'string',
            defaultVariable: true,
        },
        {
            name: 'current-time',
            label: 'Current Time (seconds)',
            type: 'number',
        },
    ],
};
