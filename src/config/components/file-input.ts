import { ComponentConfiguration } from "../types";

export const fileInput: ComponentConfiguration = {
    name: 'file-input',
    label: 'File Input',
    group: 'input',
    inputs: [
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
            defaultValue: 'audio',
        },
        {
            name: 'output-file-name',
            label: 'File Name',
            type: 'variable',
        },
        {
            name: 'output-file-id',
            label: 'File ID',
            type: 'variable',
        },
    ],
    events: [
        {
            name: 'load',
            label: 'On Load',
        }
    ],
};
