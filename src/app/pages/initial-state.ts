
// @ts-nocheck
import { State } from "../types/state";

//  TODO: remove this file, just for debugging
export const initialState: State = {
    "settings": [
        {
            "name": "container-padding",
            "value": 0,
            "variable": false,
        },
        {
            "name": "background-color",
            "value": "#FF0000",
            "variable": false,
        },
        {
            "name": "theme-color",
            "value": "#00FF00",
            "variable": false,
        },
    ],
    "globalEvents": [],
    "gridEditor": {
        "width": 6,
        "height": 10,
        "components": [
            {
                "name": "text-input",
                "x0": 1,
                "y0": 1,
                "x1": 5,
                "y1": 2,
                "inputs": [
                    {
                        "name": "placeholder",
                        "value": "Audio URL",
                        "variable": false
                    },
                    {
                        "name": "initial-text",
                        "value": "http://bit.ly/4fvcFoN",
                        "variable": false
                    },
                    {
                        "name": "output-text",
                        "value": "AUDIO URL",
                        "variable": false
                    }
                ],
                "events": []
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
                        "value": "Load URL",
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
                                "name": "load-audio",
                                "inputs": [
                                    {
                                        "name": "url",
                                        "value": "AUDIO URL",
                                        "variable": true
                                    },
                                    {
                                        "name": "async",
                                        "value": false,
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
                                "name": "change-volume",
                                "inputs": [
                                    {
                                        "name": "file-id",
                                        "value": "music",
                                        "variable": true
                                    },
                                    {
                                        "name": "volume",
                                        "value": "VOLUME",
                                        "variable": true
                                    }
                                ]
                            },
                            {
                                "name": "change-playback-rate",
                                "inputs": [
                                    {
                                        "name": "file-id",
                                        "value": "MUSIC",
                                        "variable": true
                                    },
                                    {
                                        "name": "playback-rate",
                                        "value": "SPEED",
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
                "name": "file-input",
                "x0": 1,
                "y0": 2,
                "x1": 7,
                "y1": 3,
                "inputs": [
                    {
                        "name": "file-type",
                        "value": "audio",
                        "variable": false
                    },
                    {
                        "name": "output-file-name",
                        "value": undefined,
                        "variable": false
                    },
                    {
                        "name": "output-file-id",
                        "value": "MUSIC",
                        "variable": false
                    }
                ],
                "events": [
                    {
                        "name": "load",
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
                                        "value": "VOLUME",
                                        "variable": true
                                    }
                                ]
                            },
                            {
                                "name": "change-playback-rate",
                                "inputs": [
                                    {
                                        "name": "file-id",
                                        "value": "MUSIC",
                                        "variable": true
                                    },
                                    {
                                        "name": "playback-rate",
                                        "value": "SPEED",
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
                "name": "cell",
                "x0": 1,
                "y0": 3,
                "x1": 2,
                "y1": 4,
                "inputs": [
                    {
                        "name": "text",
                        "value": "Speed:",
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
                        "value": 14,
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
                        "value": 200,
                        "variable": false
                    },
                    {
                        "name": "output-value",
                        "value": "SPEED",
                        "variable": false
                    }
                ],
                "events": []
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
                        "value": "SPEED",
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
                                        "value": "SPEED",
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
                "y0": 4,
                "x1": 7,
                "y1": 5,
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
                "name": "slider",
                "x0": 2,
                "y0": 4,
                "x1": 6,
                "y1": 5,
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
                "y0": 4,
                "x1": 2,
                "y1": 5,
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
                        "value": 14,
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
                "name": "audio-player",
                "x0": 1,
                "y0": 5,
                "x1": 7,
                "y1": 7,
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
            },
            {
                "name": "cell",
                "x0": 2,
                "y0": 7,
                "x1": 6,
                "y1": 10,
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
                "x0": 2,
                "y0": 10,
                "x1": 6,
                "y1": 11,
                "inputs": [
                    {
                        "name": "label",
                        "value": "Tell a dad joke! 🤡",
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
            }
        ]
    }
};
