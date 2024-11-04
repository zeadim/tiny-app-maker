import { $AppStart } from "./global-events/app-start";
import { GlobalEvent } from "./global-events/global-event";
import { $Interval } from "./global-events/interval";
import { $VariableChange } from "./global-events/variable-change";

// Maps name of global event as used in configuration to its class implementation
export const globalEventMap = new Map<string, typeof GlobalEvent>([
    ["app-start", $AppStart],
    ["interval", $Interval],
    ["variable-change", $VariableChange],
]);
