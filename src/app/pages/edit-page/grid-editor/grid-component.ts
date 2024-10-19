import { ComponentState } from "src/app/types/state";
import { GridElement } from "./grid-element";

export class GridComponent extends GridElement {
    public component: ComponentState;
    public label: HTMLElement;

    public constructor(component: ComponentState) {
        super(document.createElement('div'));
        this.component = component;

        this.htmlElement.style.gridColumnStart = `${component.x0}`;
        this.htmlElement.style.gridColumnEnd = `${component.x1}`;
        this.htmlElement.style.gridRowStart = `${component.y0}`;
        this.htmlElement.style.gridRowEnd = `${component.y1}`;
        this.htmlElement.classList.add('grid-component');

        this.label = document.createElement('div');
        this.label.textContent = component.type; // TODO: component's configuration .label
        this.htmlElement.appendChild(this.label);
    }

    public select(): void {
        this.htmlElement.style.zIndex = '2';
    }

    public unselect(): void {
        this.htmlElement.style.zIndex = '1';
    }
}
