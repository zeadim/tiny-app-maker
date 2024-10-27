import { ActionConfiguration } from "../../types";

export const closeWebSocket: ActionConfiguration = {
    name: 'close-websocket',
    label: 'Close WebSocket',
    group: 'network',
    inputs: [
        {
            name: 'websocket',
            label: 'ID of WebSocket to close',
            type: 'string',
        },
    ],
};
