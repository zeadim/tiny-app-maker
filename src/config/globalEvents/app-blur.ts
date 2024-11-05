import { GlobalEventConfiguration } from "../types";

export const appBlur: GlobalEventConfiguration = {
    name: 'app-blur',
    label: 'On App Blur',
    group: '',
    inputs: [],
    events: [
        {
            name: 'blur',
            label: 'On Blur',
        }
    ],
};
