import { State } from "../types/state";

//  TODO: remove this file, just for debugging
export const initialState: State = {
    "width": 6,
    "height": 10,
    "components": [
        {
            "name": "button",
            "x0": 2,
            "y0": 9,
            "x1": 6,
            "y1": 10,
            "inputs": [
                {
                    "name": "label",
                    "value": "Gimme a dad joke!",
                    "variable": false
                }
            ],
            "events": [
                {
                    "name": "click",
                    "actions": [
                        {
                            "name": "download-text",
                            "inputs": [
                                {
                                    "name": "url",
                                    "value": "https://icanhazdadjoke.com/",
                                    "variable": false
                                },
                                {
                                    "name": "output-text-content",
                                    "value": "JOKE",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "speak",
                            "inputs": [
                                {
                                    "name": "text",
                                    "value": "JOKE",
                                    "variable": true
                                }
                            ]
                        },
                        {
                            "name": "play-audio",
                            "inputs": [
                                {
                                    "name": "url-or-file-id",
                                    "value": "https://bigsoundbank.com/UPLOAD/mp3/0433.mp3?v=m",
                                    "variable": false
                                },
                                {
                                    "name": "start-offset",
                                    "value": 0,
                                    "variable": false
                                },
                                {
                                    "name": "async",
                                    "value": true,
                                    "variable": false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "cell",
            "x0": 2,
            "y0": 6,
            "x1": 6,
            "y1": 9,
            "inputs": [
                {
                    "name": "text",
                    "value": "JOKE",
                    "variable": true
                },
                {
                    "name": "font-size",
                    "value": 16,
                    "variable": false
                },
                {
                    "name": "text-color",
                    "value": "#000000",
                    "variable": false
                },
                {
                    "name": "text-padding",
                    "value": 8,
                    "variable": false
                },
                {
                    "name": "text-horizontal-alignment",
                    "value": "center",
                    "variable": false
                },
                {
                    "name": "text-vertical-alignment",
                    "value": "center",
                    "variable": false
                },
                {
                    "name": "background-color",
                    "value": "#e0eeee",
                    "variable": false
                }
            ],
            "events": []
        },
        {
            "name": "button",
            "x0": 1,
            "y0": 1,
            "x1": 3,
            "y1": 2,
            "inputs": [
                {
                    "name": "label",
                    "value": "Load Music",
                    "variable": false
                },
                {
                    "name": "disabled",
                    "value": "MUSIC LOADED",
                    "variable": true
                }
            ],
            "events": [
                {
                    "name": "click",
                    "actions": [
                        {
                            "name": "download-file",
                            "inputs": [
                                {
                                    "name": "url",
                                    "value": "https://cdn.pixabay.com/audio/2023/04/03/audio_047543feac.mp3",
                                    "variable": false
                                },
                                {
                                    "name": "file-type",
                                    "value": "audio",
                                    "variable": false
                                },
                                {
                                    "name": "output-file-id",
                                    "value": "MUSIC",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "assign-text",
                            "inputs": [
                                {
                                    "name": "value",
                                    "value": "1",
                                    "variable": false
                                },
                                {
                                    "name": "output-variable",
                                    "value": "MUSIC LOADED",
                                    "variable": false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "button",
            "x0": 3,
            "y0": 1,
            "x1": 5,
            "y1": 2,
            "inputs": [
                {
                    "name": "label",
                    "value": "Play Other Song",
                    "variable": false
                },
                {
                    "name": "disabled",
                    "value": false,
                    "variable": false
                }
            ],
            "events": [
                {
                    "name": "click",
                    "actions": [
                        {
                            "name": "goto",
                            "inputs": [
                                {
                                    "name": "index",
                                    "value": 3,
                                    "variable": false
                                },
                                {
                                    "name": "condition",
                                    "value": "SONG PLAYING",
                                    "variable": true
                                }
                            ]
                        },
                        {
                            "name": "stop-all-audio",
                            "inputs": []
                        },
                        {
                            "name": "assign-text",
                            "inputs": [
                                {
                                    "name": "value",
                                    "value": "1",
                                    "variable": false
                                },
                                {
                                    "name": "output-variable",
                                    "value": "SONG PLAYING",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "play-audio",
                            "inputs": [
                                {
                                    "name": "url-or-file-id",
                                    "value": "https://cdn.pixabay.com/audio/2024/09/09/audio_7556bb3a41.mp3",
                                    "variable": false
                                },
                                {
                                    "name": "start-offset",
                                    "value": 0,
                                    "variable": false
                                },
                                {
                                    "name": "async",
                                    "value": true,
                                    "variable": false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "button",
            "x0": 5,
            "y0": 1,
            "x1": 7,
            "y1": 2,
            "inputs": [
                {
                    "name": "label",
                    "value": "STOP ALL AUDIO",
                    "variable": false
                },
                {
                    "name": "disabled",
                    "value": false,
                    "variable": false
                }
            ],
            "events": [
                {
                    "name": "click",
                    "actions": [
                        {
                            "name": "assign-text",
                            "inputs": [
                                {
                                    "name": "value",
                                    "value": "",
                                    "variable": false
                                },
                                {
                                    "name": "output-variable",
                                    "value": "SONG PLAYING",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "stop-all-audio",
                            "inputs": []
                        }
                    ]
                }
            ]
        },
        {
            "name": "cell",
            "x0": 1,
            "y0": 2,
            "x1": 2,
            "y1": 3,
            "inputs": [
                {
                    "name": "text",
                    "value": "Pitch:",
                    "variable": false
                },
                {
                    "name": "text-color",
                    "value": "#000000",
                    "variable": false
                },
                {
                    "name": "text-padding",
                    "value": 8,
                    "variable": false
                },
                {
                    "name": "text-horizontal-alignment",
                    "value": "center",
                    "variable": false
                },
                {
                    "name": "text-vertical-alignment",
                    "value": "center",
                    "variable": false
                },
                {
                    "name": "font-size",
                    "value": 18,
                    "variable": false
                },
                {
                    "name": "background-color",
                    "value": "#ffffff",
                    "variable": false
                }
            ],
            "events": []
        },
        {
            "name": "slider",
            "x0": 2,
            "y0": 2,
            "x1": 6,
            "y1": 3,
            "inputs": [
                {
                    "name": "initial-value",
                    "value": 100,
                    "variable": false
                },
                {
                    "name": "min-value",
                    "value": 0,
                    "variable": false
                },
                {
                    "name": "max-value",
                    "value": 200,
                    "variable": false
                },
                {
                    "name": "output-value",
                    "value": "pitch",
                    "variable": false
                }
            ],
            "events": []
        },
        {
            "name": "slider",
            "x0": 2,
            "y0": 3,
            "x1": 6,
            "y1": 4,
            "inputs": [
                {
                    "name": "initial-value",
                    "value": 100,
                    "variable": false
                },
                {
                    "name": "min-value",
                    "value": 0,
                    "variable": false
                },
                {
                    "name": "max-value",
                    "value": 100,
                    "variable": false
                },
                {
                    "name": "output-value",
                    "value": "volume",
                    "variable": false
                }
            ],
            "events": []
        },
        {
            "name": "cell",
            "x0": 1,
            "y0": 3,
            "x1": 2,
            "y1": 4,
            "inputs": [
                {
                    "name": "text",
                    "value": "Volume:",
                    "variable": false
                },
                {
                    "name": "text-color",
                    "value": "#000000",
                    "variable": false
                },
                {
                    "name": "text-padding",
                    "value": 8,
                    "variable": false
                },
                {
                    "name": "text-horizontal-alignment",
                    "value": "center",
                    "variable": false
                },
                {
                    "name": "text-vertical-alignment",
                    "value": "center",
                    "variable": false
                },
                {
                    "name": "font-size",
                    "value": 18,
                    "variable": false
                },
                {
                    "name": "background-color",
                    "value": "#ffffff",
                    "variable": false
                }
            ],
            "events": []
        },
        {
            "name": "number-input",
            "x0": 6,
            "y0": 2,
            "x1": 7,
            "y1": 3,
            "inputs": [
                {
                    "name": "placeholder",
                    "value": "",
                    "variable": false
                },
                {
                    "name": "initial-number",
                    "value": 100,
                    "variable": false
                },
                {
                    "name": "output-number",
                    "value": "PITCH",
                    "variable": false
                }
            ],
            "events": [
                {
                    "name": "change",
                    "actions": [
                        {
                            "name": "change-playback-rate",
                            "inputs": [
                                {
                                    "name": "file-id",
                                    "value": "music",
                                    "variable": true
                                },
                                {
                                    "name": "playback-rate",
                                    "value": "pitch",
                                    "variable": true
                                },
                                {
                                    "name": "preserve-pitch",
                                    "value": false,
                                    "variable": false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "number-input",
            "x0": 6,
            "y0": 3,
            "x1": 7,
            "y1": 4,
            "inputs": [
                {
                    "name": "placeholder",
                    "value": "",
                    "variable": false
                },
                {
                    "name": "initial-number",
                    "value": 100,
                    "variable": false
                },
                {
                    "name": "output-number",
                    "value": "VOLUME",
                    "variable": false
                }
            ],
            "events": [
                {
                    "name": "change",
                    "actions": [
                        {
                            "name": "change-volume",
                            "inputs": [
                                {
                                    "name": "file-id",
                                    "value": "MUSIC",
                                    "variable": true
                                },
                                {
                                    "name": "volume",
                                    "value": "volume",
                                    "variable": true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "audio-player",
            "x0": 1,
            "y0": 4,
            "x1": 7,
            "y1": 6,
            "inputs": [
                {
                    "name": "url-or-file-id",
                    "value": "music",
                    "variable": true
                },
                {
                    "name": "output-current-time",
                    "value": undefined,
                    "variable": false
                },
                {
                    "name": "output-volume",
                    "value": "volume",
                    "variable": false
                }
            ],
            "events": []
        }
    ]
};
