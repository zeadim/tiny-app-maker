import { ActionConfiguration } from "../../types";

export const sendWebSocket: ActionConfiguration = {
    name: 'send-websocket',
    label: 'Send WebSocket',
    group: 'internet',
    inputs: [
        {
            name: 'websocket',
            label: 'WebSocket ID',
            type: 'string',
            defaultVariable: true,
        },
        {
            name: 'message',
            label: 'Message Payload',
            type: 'string',
        },
    ],
};
