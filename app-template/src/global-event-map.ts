import { $AppBlur } from "./global-events/app-blur";
import { $AppFocus } from "./global-events/app-focus";
import { $AppStart } from "./global-events/app-start";
import { GlobalEvent } from "./global-events/global-event";
import { $Interval } from "./global-events/interval";
import { $Invocation } from "./global-events/invocation";
import { $TimeOfDay } from "./global-events/time-of-day";
import { $VariableChange } from "./global-events/variable-change";

// Maps name of global event as used in configuration to its class implementation
export const globalEventMap = new Map<string, typeof GlobalEvent>([
    ["app-start", $AppStart],
    ["app-blur", $AppBlur],
    ["app-focus", $AppFocus],
    ["interval", $Interval],
    ["time-of-day", $TimeOfDay],
    ["variable-change", $VariableChange],
    ["invocation", $Invocation],
]);
