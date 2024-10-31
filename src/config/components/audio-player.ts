import { ComponentConfiguration } from "../types";

export const audioPlayer: ComponentConfiguration = {
    name: 'audio-player',
    label: 'Audio Player',
    group: 'button',
    inputs: [
        {
            name: 'url-or-file-id',
            label: 'Audio URL of File ID',
            type: 'string',
        },
        // TODO: add autoplay?
    ],
    events: [], // TODO: on-start/on-end?
};
