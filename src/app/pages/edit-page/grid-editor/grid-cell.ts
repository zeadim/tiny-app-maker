import { GridElement } from "./grid-element";

export class GridCell extends GridElement {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        super(document.createElement('div'));
        this.x = x;
        this.y = y;

        this.htmlElement.style.gridColumnStart = `${this.x + 1}`;
        this.htmlElement.style.gridColumnEnd = `${this.x + 2}`;
        this.htmlElement.style.gridRowStart = `${this.y + 1}`;
        this.htmlElement.style.gridRowEnd = `${this.y + 2}`;
        this.htmlElement.classList.add('grid-cell');
    }
}
