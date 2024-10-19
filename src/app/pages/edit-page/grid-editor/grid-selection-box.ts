import { GridComponent } from "./grid-component";
import { GridElement } from "./grid-element";
import { GridSelectionBoxCorner } from "./grid-selection-box-corner";

export class GridSelectionBox extends GridElement {
    public gridComponent: GridComponent;
    public corners: GridSelectionBoxCorner[] = [];

    public constructor(gridComponent: GridComponent) {
        super(document.createElement('div'));
        this.gridComponent = gridComponent;

        this.htmlElement.style.gridColumnStart = this.gridComponent.htmlElement.style.gridColumnStart;
        this.htmlElement.style.gridColumnEnd = this.gridComponent.htmlElement.style.gridColumnEnd;
        this.htmlElement.style.gridRowStart = this.gridComponent.htmlElement.style.gridRowStart;
        this.htmlElement.style.gridRowEnd = this.gridComponent.htmlElement.style.gridRowEnd;
        this.htmlElement.classList.add('grid-selection-box');

        for (let i = 0; i < 4; i++) {
            const corner = new GridSelectionBoxCorner(i);
            this.htmlElement.appendChild(corner.htmlElement);
            this.corners.push(corner);
        }
    }

    public override destroy(): void {
        this.corners.forEach(corner => corner.destroy());
        super.destroy();
    }
}
