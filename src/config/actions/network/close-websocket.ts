import { ActionConfiguration } from "../../types";

export const closeWebSocket: ActionConfiguration = {
    name: 'close-websocket',
    label: 'Close WebSocket',
    group: 'network',
    inputs: [
        {
            name: 'websocket',
            label: 'WebSocket to close',
            type: 'string',
            defaultVariable: true,
        },
    ],
};
