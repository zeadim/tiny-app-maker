import { App } from './app';
import { componentMap } from './component-map';
import './style.css';

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

