import { ActionConfiguration } from "./types";
import { doNothing } from "./actions/do-nothing";
import { wait } from "./actions/control-flow/wait";
import { openWebSocket } from "./actions/network/open-websocket";
import { alert } from "./actions/popup/alert";
import { assignText } from "./actions/assignment/assign-text";
import { goto } from "./actions/control-flow/goto";
import { stop } from "./actions/control-flow/stop";
import { sendWebSocket } from "./actions/network/send-websocket";
import { closeWebSocket } from "./actions/network/close-websocket";
import { vibrate } from "./actions/other/vibrate";
import { add } from "./actions/math/add";
import { speak } from "./actions/audio/speak";
import { downloadText } from "./actions/network/download-text";
import { playAudio } from "./actions/audio/play-audio";
import { downloadFile } from "./actions/network/download-file";
import { loadAudio } from "./actions/audio/load-audio";
import { pauseAudio } from "./actions/audio/pause-audio";

export const actionList: ActionConfiguration[] = [
    doNothing,

    // other
    vibrate,

    // audio
    speak,
    loadAudio,
    playAudio,
    pauseAudio,

    // popup
    alert,

    // network
    downloadText,
    downloadFile,
    openWebSocket,
    sendWebSocket,
    closeWebSocket,

    // control flow
    goto,
    stop,
    wait,

    // assignment
    assignText,

    // math
    add,
];
