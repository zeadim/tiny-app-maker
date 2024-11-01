import { ComponentConfiguration } from "../types";

export const audioPlayer: ComponentConfiguration = {
    name: 'audio-player',
    label: 'Audio Player',
    group: 'button',
    inputs: [
        {
            name: 'url-or-file-id',
            label: 'Audio URL or File ID',
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
