import { GlobalEventConfiguration } from "../types";

export const appFocus: GlobalEventConfiguration = {
    name: 'app-focus',
    label: 'On App Focus',
    group: '',
    inputs: [],
    events: [
        {
            name: 'focus',
            label: 'On Focus',
        }
    ],
};
