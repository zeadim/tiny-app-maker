import { App } from "../app";
import { EventState, InputState } from "../types";
import { InputListenerActionSource } from "../input-listener-action-source";

export class Component extends InputListenerActionSource {
    protected x0: number;
    protected y0: number;
    protected x1: number;
    protected y1: number;

    public htmlElement: HTMLElement;

    public constructor(app: App, x0: number, y0: number, x1: number, y1: number, inputs: InputState[], events: EventState[]) {
        super(app, inputs,events);

        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;

        this.htmlElement = this.createHtmlElement();
        /*const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.minWidth = '0';
        div.style.maxWidth = '100%';
        div.style.overflow = 'hidden';
        div.style.backgroundColor = 'white';
        div.style.boxShadow = '0 0 1px 0px rgba(0, 0, 0, 0.2)';
        //div.style.border = '1px solid black';
        div.appendChild(this.htmlElement);
        this.htmlElement.style.flex = '1';
        this.htmlElement = div;*/
        this.htmlElement.style.gridColumnStart = `${this.x0}`;
        this.htmlElement.style.gridRowStart = `${this.y0}`;
        this.htmlElement.style.gridColumnEnd = `${this.x1}`;
        this.htmlElement.style.gridRowEnd = `${this.y1}`;

        this.notifyInitialInputUpdates();
    }

    protected createHtmlElement(): HTMLElement {
        return document.createElement('div');
    }
}
