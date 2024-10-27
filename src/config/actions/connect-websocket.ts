import { ActionConfiguration } from "../types";

export const connectWebsocket: ActionConfiguration = {
    name: 'connect-websocket',
    label: 'Connect Websocket',
    group: 'network',
    inputs: [
        {
            name: 'url',
            label: 'Websocket URL',
            type: 'string',
        },
        {
            name: 'output-websocket',
            label: 'websocket',
            type: 'variable',
        },
        {
            name: 'output-last-message',
            label: 'last message',
            type: 'variable',
        }
    ],
};
