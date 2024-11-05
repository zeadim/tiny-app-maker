import { appBlur } from "./globalEvents/app-blur";
import { appFocus } from "./globalEvents/app-focus";
import { appStart } from "./globalEvents/app-start";
import { interval } from "./globalEvents/interval";
import { invocation } from "./globalEvents/invocation";
import { timeOfDay } from "./globalEvents/time-of-day";
import { variableChange } from "./globalEvents/variable-change";
import { GlobalEventConfiguration } from "./types";

export const globalEventList: GlobalEventConfiguration[] = [
    appStart,
    appBlur,
    appFocus,
    interval,
    timeOfDay,
    variableChange,
    invocation,
];
