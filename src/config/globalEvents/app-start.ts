import { GlobalEventConfiguration } from "../types";

export const appStart: GlobalEventConfiguration = {
    name: 'app-start',
    label: 'On App Start',
    group: '',
    inputs: [],
    events: [
        {
            name: 'start',
            label: 'On Start',
        }
    ],
};
