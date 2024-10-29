import { ComponentConfiguration } from "./types";
import { button } from "./components/button";
import { textInput } from "./components/text-input";
import { numberInput } from "./components/number-input";
import { label } from "./components/label";
import { cell } from "./components/cell";

export const componentList: ComponentConfiguration[] = [
    cell,
    button,
    textInput,
    numberInput,
    label, // TODO: remove label? (cell replaces it)
];
