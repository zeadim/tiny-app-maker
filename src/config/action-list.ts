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
import { stopAllAudio } from "./actions/audio/stop-all-audio";
import { stopAudio } from "./actions/audio/stop-audio";
import { loadAudio } from "./actions/audio/load-audio";
import { changeVolume } from "./actions/audio/change-volume";
import { changePlaybackRate } from "./actions/audio/change-playback-rate";
import { loadVideo } from "./actions/audio/load-video";
import { openUrl } from "./actions/popup/open-url";
import { changeCurrentTime } from "./actions/audio/change-current-time";
import { invokeFunction } from "./actions/other/invoke-function";
import { assignNumber } from "./actions/assignment/assign-number";
import { assignBoolean } from "./actions/assignment/assign-boolean";
import { assignColor } from "./actions/assignment/assign-color";

export const actionList: ActionConfiguration[] = [
    doNothing,

    // other
    speak,
    vibrate,
    invokeFunction,

    // audio
    loadAudio,
    loadVideo,
    playAudio,
    stopAudio,
    stopAllAudio,
    changeCurrentTime,
    changePlaybackRate,
    changeVolume,

    // popup
    alert,
    openUrl,

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
    assignNumber,
    assignBoolean,
    assignColor,

    // math
    //add,
];
