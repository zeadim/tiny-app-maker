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
    ],
    events: [
        {
            name: 'interval',
            label: 'On Interval',
        }
    ],
};
