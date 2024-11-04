import { GlobalEventConfiguration } from "../types";

export const interval: GlobalEventConfiguration = {
    name: 'interval',
    label: 'On Interval',
    group: '',
    inputs: [
        {
            name: 'interval',
            label: 'Interval (seconds)',
            type: 'number',
            defaultValue: 1,
        },
        {
            name: 'immediate',
            label: 'Trigger on start',
            type: 'boolean',
            defaultValue: false,
        },
        {
            name: 'async',
            label: 'Asynchronous',
            type: 'boolean',
            defaultValue: false,
        },
    ],
    events: [
        {
            name: 'interval',
            label: 'On Interval',
        }
    ],
};
