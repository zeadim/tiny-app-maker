import { ComponentConfiguration } from "../types";

export const videoPlayer: ComponentConfiguration = {
    name: 'video-player',
    label: 'Video Player',
    group: 'button',
    inputs: [
        {
            name: 'url',
            label: 'Video URL',
            type: 'string',
        },
        // TODO: add autoplay?
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
