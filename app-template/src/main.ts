import { App } from './app';
import { componentMap } from './component-map';
import { globalEventMap } from './global-event-map';
import { InputListenerActionSource } from './input-listener-action-source';
import { InputState, State } from './types';
import './style.css';

window.addEventListener('load', () => initializeApp());
window.addEventListener('beforeunload', () => window.speechSynthesis.cancel());

async function decompress(byteArray: ArrayBuffer): Promise<string> {
    const cs = new DecompressionStream('deflate-raw');
    const writer = cs.writable.getWriter();
    writer.write(byteArray);
    writer.close();
    const arrayBuffer = await new Response(cs.readable).arrayBuffer();
    return new TextDecoder().decode(arrayBuffer);
}

function convertFromBase64(encoded: string): ArrayBuffer {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

async function initializeApp(): Promise<void> {
    let hash = location.hash;
    if (hash.startsWith('#'))
        hash = hash.slice(1);

    try {
        const json = await decompress(convertFromBase64(hash));
        const data = JSON.parse(json);
        (window as any).appConfig = data;
    } catch (err) {
        //
    }

    const insideIframe = window.self !== window.top;
    /*if (insideIframe) {
        document.body.style.padding = '1px';
    }*/

    const { settings, gridEditor, globalEvents } = (window as any).appConfig as State;
    const gridElement = document.getElementById('grid')!;

    const width = gridEditor.width;
    const height = gridEditor.height;

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

    for (const componentConfig of gridEditor.components) {
        const { name, x0, y0, x1, y1, inputs, events } = componentConfig;

        const ComponentClass = componentMap.get(name);
        if (!ComponentClass) {
            console.warn(`Unsupported component type in config: ${name}`);
            continue;
        }

        const component = new ComponentClass(app, x0, y0, x1, y1, inputs, events);
        app.addComponent(component);
    }

    setTimeout(() => {
        for (const globalEventConfig of globalEvents) {
            const { name, inputs, events } = globalEventConfig;

            const GlobalEventClass = globalEventMap.get(name);
            if (!GlobalEventClass) {
                console.warn(`Unsupported global event type in config: ${name}`);
                continue;
            }

            new GlobalEventClass(app, inputs, events);
        }
    });

    new SettingsController(app, settings);
}

class SettingsController extends InputListenerActionSource {

    public constructor(app: App, settings: InputState[]) {
        super(app, settings, []);

        this.setUp();
        this.notifyInitialInputUpdates();
    }

    private setUp(): void {
        this.addInputNumberListener('container-width', (value) => {
            // TODO
        });
        
        this.addInputNumberListener('container-height', (value) => {
            // TODO
        });
        
        this.addInputNumberListener('container-padding', (value) => {
            document.getElementById('grid')!.style.padding = `${value ?? 0}px`;
        });

        this.addInputColorListener('background-color', (value) => {
            // TODO
        });
        
        this.addInputColorListener('theme-color', (value) => {
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value ?? '#8dd');
        });
        
        this.addInputStringListener('ui-theme', (value) => {
            // TODO
            console.log('UI THEME:', value);
        });
    }
}
