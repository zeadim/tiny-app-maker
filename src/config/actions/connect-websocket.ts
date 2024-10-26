import { ActionConfiguration } from "../types";

export const connectWebsocket: ActionConfiguration = {
    type: 'connectWebsocket',
    label: 'Connect Websocket',
    group: 'network',
    inputs: [
        {
            name: 'url',
            label: 'Websocket URL',
            type: 'string',
        },
        
        // TODO: actually outputs
        {
            name: 'websocket-var',
            label: 'Variable to put websocket into',
            type: 'variable',
        },
        {
            name: 'last-message-var',
            label: 'Variable to put last message into',
            type: 'variable',
        }
    ],
};
