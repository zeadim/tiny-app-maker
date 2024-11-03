import { Action } from "./actions/action";
import { $Alert } from "./actions/popup/alert";
import { $AssignVariable } from "./actions/assignment/assign-variable";
import { $Wait } from "./actions/control-flow/wait";
import { $OpenWebSocket } from "./actions/network/open-websocket";
import { $Speak } from "./actions/audio/speak";
import { $Vibrate } from "./actions/other/vibrate";
import { $SendWebSocket } from "./actions/network/send-websocket";
import { $CloseWebSocket } from "./actions/network/close-websocket";
import { $GoTo } from "./actions/control-flow/goto";
import { $Stop } from "./actions/control-flow/stop";
import { $Add } from "./actions/math/add";
import { $PlayAudio } from "./actions/audio/play-audio";
import { $DownloadText } from "./actions/network/download-text";
import { $DownloadFile } from "./actions/network/download-file";
import { $StopAudio } from "./actions/audio/stop-audio";
import { $StopAllAudio } from "./actions/audio/stop-all-audio";
import { $LoadAudio } from "./actions/audio/load-audio";
import { $ChangeVolume } from "./actions/audio/change-volume";
import { $ChangePlaybackRate } from "./actions/audio/change-playback-rate";
import { $LoadVideo } from "./actions/audio/load-video";
import { $OpenUrl } from "./actions/popup/open-url";

// Maps name of action as used in configuration to its class implementation
export const actionMap = new Map<string, typeof Action>([
    // other
    ["vibrate", $Vibrate],

    // audio
    ["speak", $Speak],
    ["load-audio", $LoadAudio],
    ["play-audio", $PlayAudio],
    ["stop-audio", $StopAudio],
    ["stop-all-audio", $StopAllAudio],
    ["change-volume", $ChangeVolume],
    ["change-playback-rate", $ChangePlaybackRate],
    ["load-video", $LoadVideo],

    // popup
    ["alert", $Alert],
    ["open-url", $OpenUrl],

    // network
    ["download-text", $DownloadText],
    ["download-file", $DownloadFile],
    ["open-websocket", $OpenWebSocket],
    ["send-websocket", $SendWebSocket],
    ["close-websocket", $CloseWebSocket],

    // control flow
    ["goto", $GoTo],
    ["stop", $Stop],
    ["wait", $Wait],

    // assignment
    ["assign-text", $AssignVariable],

    // math
    ["add", $Add],
]);
