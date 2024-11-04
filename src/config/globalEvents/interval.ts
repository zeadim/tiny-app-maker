import { GlobalEventConfiguration } from "../types";

export const interval: GlobalEventConfiguration = {
    name: 'interval',
    label: 'Interval',
    group: '',
    inputs: [
        {
            name: 'interval',
            label: 'Interval (seconds)',
            type: 'number',
            defaultValue: 1,
        },
    ],
    events: [],
};
