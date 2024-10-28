import { ActionConfiguration } from "../../types";

export const playAudio: ActionConfiguration = {
    name: 'play-audio',
    label: 'Play Audio',
    group: 'audio',
    inputs: [
        {
            name: 'url',
            label: 'Audio URL',
            type: 'string',
        },
    ],
};
