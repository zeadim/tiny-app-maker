import { ComponentState } from "src/app/types/state";
import { GridElement } from "./grid-element";
import { componentList } from "src/config/component-list";

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
        this.update();
        this.htmlElement.appendChild(this.label);
    }

    public update(): void {
        const config = componentList.find(x => x.type === this.component.type)!;
        this.label.textContent = config.label;
    }

    public select(): void {
        this.htmlElement.style.zIndex = '2';
    }

    public unselect(): void {
        this.htmlElement.style.zIndex = '1';
    }

    public highlight(): void {
        this.htmlElement.classList.remove('highlight');
        setTimeout(() => this.htmlElement.classList.add('highlight'));
    }
}
