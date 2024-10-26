import { ActionConfiguration } from "./types";
import { doNothing } from "./actions/do-nothing";
import { wait } from "./actions/wait";
import { connectWebsocket } from "./actions/connect-websocket";

export const actionList: ActionConfiguration[] = [
    doNothing,
    wait,
    connectWebsocket,
];
