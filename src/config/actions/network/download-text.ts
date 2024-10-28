import { ActionConfiguration } from "../../types";

export const downloadText: ActionConfiguration = {
    name: 'download-text',
    label: 'Download Text',
    group: 'network',
    inputs: [
        {
            name: 'url',
            label: 'Download URL',
            type: 'string',
        },
        {
            name: 'output-text-content',
            label: 'text content',
            type: 'variable',
        },
    ],
};
