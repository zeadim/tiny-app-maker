import { ActionConfiguration } from "../../types";

export const alert: ActionConfiguration = {
    name: 'alert',
    label: 'Alert',
    group: 'popup',
    inputs: [
        {
            name: 'message',
            label: 'Message Content',
            type: 'string',
        },
    ],
};
