import { Action } from "./action";
import { $Alert } from "./actions/alert";
import { $AssignVariable } from "./actions/assign-variable";
import { $Wait } from "./actions/wait";

// Maps name of action as used in configuration to its class implementation
export const actionMap = new Map<string, typeof Action>([
    ["wait", $Wait],
    ["alert", $Alert],
    ["assign-text", $AssignVariable],
]);
