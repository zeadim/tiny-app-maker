import { ActionConfiguration } from "../../types";

export const openUrl: ActionConfiguration = {
    name: 'open-url',
    label: 'Open URL',
    group: 'popup',
    inputs: [
        {
            name: 'url',
            label: 'URL',
            type: 'string',
        },
        {
            name: 'open-in-new-tab',
            label: 'Open In New Tab',
            type: 'boolean',
            defaultValue: true,
            trueLabel: 'Yes',
            falseLabel: 'No',
        }
    ],
};
