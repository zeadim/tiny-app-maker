import { ComponentConfiguration } from "./types";
import { button } from "./components/button";
import { textInput } from "./components/text-input";
import { numberInput } from "./components/number-input";
import { label } from "./components/label";

export const componentList: ComponentConfiguration[] = [
    button,
    textInput,
    numberInput,
    label,
];
