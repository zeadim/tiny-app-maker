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

// Maps name of action as used in configuration to its class implementation
export const actionMap = new Map<string, typeof Action>([
    // other
    ["vibrate", $Vibrate],

    // audio
    ["play-audio", $PlayAudio],
    ["speak", $Speak],

    // popup
    ["alert", $Alert],

    // network
    ["download-text", $DownloadText],
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
