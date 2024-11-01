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
    events: [
        /*{
            name: 'seek',
            label: 'On Seek',
        },
        {
            name: 'volume',
            label: 'On Volume', // does this make, sense - perhaps better as output variable?
        }*/
    ],
};
