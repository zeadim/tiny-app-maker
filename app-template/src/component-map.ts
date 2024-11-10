import { Component } from "./components/component";
import { $Button } from "./components/button";
import { $TextInput } from "./components/text-input";
import { $NumberInput } from "./components/number-input";
import { $Cell } from "./components/cell";
import { $FileInput } from "./components/file-input";
import { $AudioPlayer } from "./components/audio-player";
import { $Slider } from "./components/slider";
import { $VideoPlayer } from "./components/video-player";
import { $BooleanInput } from "./components/boolean-input";
import { $YouTubeVideo } from "./components/youtube-video";
import { $WebsiteEmbedding } from "./components/website-embedding";

// Maps name of component as used in configuration to its class implementation
export const componentMap = new Map<string, typeof Component>([
    ["button", $Button],
    ["text-input", $TextInput],
    ["number-input", $NumberInput],
    ["cell", $Cell],
    ["file-input", $FileInput],
    ["audio-player", $AudioPlayer],
    ["slider", $Slider],
    ["video-player", $VideoPlayer],
    ["boolean-input", $BooleanInput],
    ["youtube-video", $YouTubeVideo],
    ["website-embedding", $WebsiteEmbedding],
]);
