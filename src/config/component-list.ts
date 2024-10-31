import { ComponentConfiguration } from "./types";
import { button } from "./components/button";
import { textInput } from "./components/text-input";
import { numberInput } from "./components/number-input";
import { cell } from "./components/cell";
import { fileInput } from "./components/file-input";
import { audioPlayer } from "./components/audio-player";

export const componentList: ComponentConfiguration[] = [
    cell,
    button,
    textInput,
    numberInput,
    fileInput,
    audioPlayer,
];
