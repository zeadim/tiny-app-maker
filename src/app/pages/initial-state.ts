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
                            "name": "load-audio",
                            "inputs": [
                                {
                                    "name": "url",
                                    "value": "https://bigsoundbank.com/UPLOAD/mp3/0433.mp3?v=m",
                                    "variable": false
                                },
                                {
                                    "name": "autoplay",
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
            "y0": 5,
            "x1": 6,
            "y1": 8,
            "inputs": [
                {
                    "name": "text",
                    "value": "JOKE",
                    "variable": true
                },
                {
                    "name": "font-size",
                    "value": 18,
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
                    "value": "SONG 1",
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
                            "name": "pause-audio",
                            "inputs": [
                                {
                                    "name": "id",
                                    "value": "SONG 2",
                                    "variable": true
                                },
                                {
                                    "name": "reset",
                                    "value": false,
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
                                    "value": "SONG PLAYING",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "load-audio",
                            "inputs": [
                                {
                                    "name": "url",
                                    "value": "https://cdn.pixabay.com/audio/2024/09/09/audio_7556bb3a41.mp3",
                                    "variable": false
                                },
                                {
                                    "name": "autoplay",
                                    "value": true,
                                    "variable": false
                                },
                                {
                                    "name": "async",
                                    "value": true,
                                    "variable": false
                                },
                                {
                                    "name": "output-audio",
                                    "value": "SONG 1",
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
                    "value": "SONG 2",
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
                            "name": "pause-audio",
                            "inputs": [
                                {
                                    "name": "id",
                                    "value": "SONG 1",
                                    "variable": true
                                },
                                {
                                    "name": "reset",
                                    "value": false,
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
                                    "value": "SONG PLAYING",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "load-audio",
                            "inputs": [
                                {
                                    "name": "url",
                                    "value": "https://cdn.pixabay.com/audio/2024/09/09/audio_6b1edef254.mp3",
                                    "variable": false
                                },
                                {
                                    "name": "autoplay",
                                    "value": true,
                                    "variable": false
                                },
                                {
                                    "name": "async",
                                    "value": true,
                                    "variable": false
                                },
                                {
                                    "name": "output-audio",
                                    "value": "SONG 2",
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
            "x0": 1,
            "y0": 2,
            "x1": 7,
            "y1": 3,
            "inputs": [
                {
                    "name": "label",
                    "value": "STOP PLAYING SONG",
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
                            "name": "pause-audio",
                            "inputs": [
                                {
                                    "name": "id",
                                    "value": "SONG 1",
                                    "variable": true
                                },
                                {
                                    "name": "reset",
                                    "value": "RESET",
                                    "variable": true
                                }
                            ]
                        },
                        {
                            "name": "pause-audio",
                            "inputs": [
                                {
                                    "name": "id",
                                    "value": "SONG 2",
                                    "variable": true
                                },
                                {
                                    "name": "reset",
                                    "value": "RESET",
                                    "variable": true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "button",
            "x0": 4,
            "y0": 3,
            "x1": 7,
            "y1": 4,
            "inputs": [
                {
                    "name": "label",
                    "value": "TOGGLE RESET",
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
                                    "value": 5,
                                    "variable": false
                                },
                                {
                                    "name": "condition",
                                    "value": "RESET",
                                    "variable": true
                                }
                            ]
                        },
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
                                    "value": "RESET",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "assign-text",
                            "inputs": [
                                {
                                    "name": "value",
                                    "value": "NO",
                                    "variable": false
                                },
                                {
                                    "name": "output-variable",
                                    "value": "RESET LABEL",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "stop",
                            "inputs": [
                                {
                                    "name": "condition",
                                    "value": "",
                                    "variable": true
                                }
                            ]
                        },
                        {
                            "name": "assign-text",
                            "inputs": [
                                {
                                    "name": "value",
                                    "value": "YES",
                                    "variable": false
                                },
                                {
                                    "name": "output-variable",
                                    "value": "RESET",
                                    "variable": false
                                }
                            ]
                        },
                        {
                            "name": "assign-text",
                            "inputs": [
                                {
                                    "name": "value",
                                    "value": "YES",
                                    "variable": false
                                },
                                {
                                    "name": "output-variable",
                                    "value": "RESET LABEL",
                                    "variable": false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "label",
            "x0": 1,
            "y0": 3,
            "x1": 3,
            "y1": 4,
            "inputs": [
                {
                    "name": "text",
                    "value": "Reset On Stop?",
                    "variable": false
                },
                {
                    "name": "font-size",
                    "value": 14,
                    "variable": false
                }
            ],
            "events": []
        },
        {
            "name": "text-input",
            "x0": 3,
            "y0": 3,
            "x1": 4,
            "y1": 4,
            "inputs": [
                {
                    "name": "placeholder",
                    "value": "",
                    "variable": false
                },
                {
                    "name": "initial-text",
                    "value": "NO",
                    "variable": false
                },
                {
                    "name": "output-text",
                    "value": "RESET LABEL",
                    "variable": false
                }
            ],
            "events": []
        }
    ]
};
