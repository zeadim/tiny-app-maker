import { ActionConfiguration } from "./types";
import { doNothing } from "./actions/do-nothing";
import { wait } from "./actions/wait";
import { connectWebsocket } from "./actions/connect-websocket";
import { alert } from "./actions/alert";
import { assignText } from "./actions/assign-text";

export const actionList: ActionConfiguration[] = [
    doNothing,
    wait,
    connectWebsocket,
    alert,
    assignText,
];
