import { App } from './app';
import { componentMap } from './component-map';
import './style.css';
import { State } from './types';

// @ts-ignore
window.xappConfig = { // TODO: remove, just for debugging
    "width": 4,
    "height": 8,
    "components": [
        {
            "name": "button",
            "x0": 2,
            "y0": 6,
            "x1": 4,
            "y1": 8,
            "inputs": [
                {
                    "name": "label",
                    "value": "Just click here!",
                    "variable": false
                }
            ],
            "events": [
                {
                    name: "click",
                    actions: [
                        {
                            name: "alert",
                            inputs: [
                                {
                                    name: "message",
                                    value: "In 3 seconds, I will tell you the textbox text.",
                                    variable: false
                                }
                            ]
                        },
                        {
                            name: "wait",
                            inputs: [
                                {
                                    name: "duration",
                                    value: "3000",
                                    variable: false
                                }
                            ]
                        },
                        {
                            name: "alert",
                            inputs: [
                                {
                                    name: "message",
                                    value: "TEST",
                                    variable: true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "text-input",
            "x0": 1,
            "y0": 3,
            "x1": 5,
            "y1": 4,
            "inputs": [
                {
                    "name": "placeholder",
                    "value": "Please enter here...",
                    "variable": false
                },
                {
                    "name": "output-text",
                    "value": "TEST",
                    "variable": false
                }
            ],
            "events": []
        }
    ]
};

window.addEventListener('load', () => initializeApp());

function initializeApp() {
    // @ts-ignore
    const { width, height, components } = window.appConfig;
    const gridElement = document.getElementById('grid')!;

    // Create app page grid
    gridElement.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    for (let i = 0; i < width * height; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        const cell = document.createElement('div');
        cell.style.gridColumnStart = `${x + 1}`;
        cell.style.gridColumnEnd = `${x + 2}`;
        cell.style.gridRowStart = `${y + 1}`;
        cell.style.gridRowEnd = `${y + 2}`;
        cell.classList.add('grid-cell');
        gridElement.appendChild(cell);
    }

    // Set up app with components and events
    const app = new App(gridElement);

    for (const componentConfig of components) {
        const { name, x0, y0, x1, y1, inputs, events } = componentConfig;
        
        const ComponentClass = componentMap.get(name);
        if (!ComponentClass) {
            console.warn(`Unsupported component type in config: ${name}`);
            continue;
        }

        const component = new ComponentClass(app, x0, y0, x1, y1, inputs, events);
        // TODO: configure events (with actions)
        app.addComponent(component);
    }
}

