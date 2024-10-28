import { ActionConfiguration } from "../../types";

export const downloadFile: ActionConfiguration = {
    name: 'download-file',
    label: 'Download File',
    group: 'internet',
    inputs: [
        {
            name: 'url',
            label: 'Download URL',
            note: 'CORS required',
            type: 'string',
        },
        {
            name: 'output-file-id',
            label: 'File ID',
            type: 'variable',
        },
    ],
};
