import { ActionConfiguration } from "../../types";

export const closeWebSocket: ActionConfiguration = {
    name: 'close-websocket',
    label: 'Close WebSocket',
    group: 'internet',
    inputs: [
        {
            name: 'websocket',
            label: 'WebSocket ID',
            note: 'Obtain via open',
            type: 'string',
            defaultVariable: true,
        },
    ],
};
