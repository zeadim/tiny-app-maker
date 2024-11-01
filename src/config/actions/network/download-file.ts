import { ActionConfiguration } from "../../types";

export const downloadFile: ActionConfiguration = {
    name: 'download-file',
    label: 'Download File',
    group: 'internet',
    inputs: [
        {
            name: 'url',
            label: 'Download URL',
            note: 'CORS required!',
            type: 'string',
        },
        {
            name: 'file-type',
            label: 'File Type',
            type: 'options',
            options: [
                { label: 'text', value: 'text' },
                { label: 'image', value: 'image' },
                { label: 'audio', value: 'audio' },
                { label: 'video', value: 'video' },
                { label: 'binary', value: 'buffer' },
            ],
            defaultValue: 'text',
        },
        {
            name: 'async',
            label: 'Download Asynchronously',
            type: 'boolean',
            defaultValue: false,
        },
        {
            name: 'output-file-id',
            label: 'File ID',
            type: 'variable',
        },
    ],
};
