import { ComponentConfiguration } from "../types";

export const youtubeVideo: ComponentConfiguration = {
    name: 'youtube-video',
    label: 'YouTube Video',
    group: 'embed',
    inputs: [
        {
            name: 'youtube-url-or-id',
            label: 'YouTube URL',
            type: 'string',
        },
        {
            name: 'start-offset',
            label: 'Start Time Offset (seconds)',
            type: 'number',
            defaultValue: 0,
        },
    ],
    events: [],
};
