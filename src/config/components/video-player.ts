import { ComponentConfiguration } from "../types";

export const videoPlayer: ComponentConfiguration = {
    name: 'video-player',
    label: 'Video Player',
    group: 'button',
    inputs: [
        {
            name: 'url-or-file-id',
            label: 'Video URL or File ID',
            type: 'string',
        },
        {
            name: 'output-current-time',
            label: 'Current Time',
            type: 'variable',
        },
        {
            name: 'output-volume',
            label: 'Current Volume',
            type: 'variable',
        },
    ],
    events: [
        {
            name: 'play',
            label: 'On Play'
        },
        {
            name: 'pause',
            label: 'On Pause',
        }
    ],
};
