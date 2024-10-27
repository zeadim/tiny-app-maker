import { GridElement } from "./grid-element";

export class GridSelectionBoxCorner extends GridElement {
    public cornerIndex: number;

    public constructor(cornerIndex: number) {
        super(document.createElement('div'));
        this.cornerIndex = cornerIndex;

        this.htmlElement.classList.add('corner', `corner-${this.cornerIndex}`);

        const disk = document.createElement('div');
        disk.classList.add('corner-disk', `corner-disk-${this.cornerIndex}`);
        this.htmlElement.appendChild(disk);
    }
}
