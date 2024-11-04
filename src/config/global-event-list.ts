import { appStart } from "./globalEvents/app-start";
import { interval } from "./globalEvents/interval";
import { variableChange } from "./globalEvents/variable-change";
import { GlobalEventConfiguration } from "./types";

export const globalEventList: GlobalEventConfiguration[] = [
    appStart,
    interval,
    variableChange,
];
