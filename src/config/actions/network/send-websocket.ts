import { ActionConfiguration } from "../../types";

export const sendWebSocket: ActionConfiguration = {
    name: 'send-websocket',
    label: 'Send WebSocket',
    group: 'network',
    inputs: [
        {
            name: 'websocket',
            label: 'WebSocket to send message over',
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
