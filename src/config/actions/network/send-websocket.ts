import { ActionConfiguration } from "../../types";

export const sendWebSocket: ActionConfiguration = {
    name: 'send-websocket',
    label: 'Send WebSocket',
    group: 'network',
    inputs: [
        {
            name: 'websocket',
            label: 'ID of WebSocket to send message over',
            type: 'string',
            //alwaysVariable: true / defaultVariable: true (?)
        },
        {
            name: 'message',
            label: 'Message Payload',
            type: 'string',
        },
    ],
};
