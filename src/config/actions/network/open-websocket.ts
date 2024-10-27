import { ActionConfiguration } from "../../types";

export const openWebSocket: ActionConfiguration = {
    name: 'open-websocket',
    label: 'Open WebSocket',
    group: 'network',
    inputs: [
        {
            name: 'url',
            label: 'WebSocket URL',
            type: 'string',
        },
        {
            name: 'output-websocket',
            label: 'WebSocket ID',
            type: 'variable',
        },
        {
            name: 'output-last-message',
            label: 'Last Message',
            type: 'variable',
        }
    ],
};
