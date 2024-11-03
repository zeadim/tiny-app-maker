import { ComponentConfiguration } from "./types";
import { button } from "./components/button";
import { textInput } from "./components/text-input";
import { numberInput } from "./components/number-input";
import { cell } from "./components/cell";
import { fileInput } from "./components/file-input";
import { audioPlayer } from "./components/audio-player";
import { slider } from "./components/slider";
import { videoPlayer } from "./components/video-player";
import { booleanInput } from "./components/boolean-input";
import { youtubeVideo } from "./components/youtube-video";

export const componentList: ComponentConfiguration[] = [
    cell,
    button,
    textInput,
    numberInput,
    fileInput,
    audioPlayer,
    slider,
    videoPlayer,
    booleanInput,
    youtubeVideo,
];
