import { ComponentConfiguration } from "../types";

export const websiteEmbedding: ComponentConfiguration = {
    name: 'website-embedding',
    label: 'Website Embedding',
    group: 'embed',
    inputs: [
        {
            name: 'url',
            label: 'Website URL',
            type: 'string',
        },
        {
            name: 'zoom',
            label: 'Zoom Level',
            type: 'number',
            defaultValue: 1,
        },
    ],
    events: [],
};
