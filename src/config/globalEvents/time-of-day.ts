import { GlobalEventConfiguration } from "../types";

export const timeOfDay: GlobalEventConfiguration = {
    name: 'time-of-day',
    label: 'On Time of Day',
    group: '',
    inputs: [
        {
            name: 'time',
            label: 'Time of Day',
            type: 'time',
        }
    ],
    events: [
        {
            name: 'alarm',
            label: 'On Alarm',
        }
    ],
};
