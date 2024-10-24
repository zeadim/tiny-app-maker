
import { Subject } from "rxjs";
import { ComponentState, State } from "../../../types/state";
import { GridCell } from "./grid-cell";
import { GridComponent } from "./grid-component";
import { GridSelectionBox } from "./grid-selection-box";
import { GridSelectionBoxCorner } from "./grid-selection-box-corner";
import { GridElement } from "./grid-element";

export class GridEditor {
    private containerElement: HTMLElement;

    private gridWidth: number = 1;
    private gridHeight: number = 1;
    private gridCells: GridCell[] = [];
    private gridComponents: GridComponent[] = [];
    private selectedGridComponent?: GridComponent;
    private gridSelectionBox?: GridSelectionBox;
    private gridSelectionBoxCorner?: GridSelectionBoxCorner;
    private movingSelection = false;
    private pointerPosition = { x: 0, y: 0 };
    private startMovePosition = { x: 0, y: 0 };
    private eventListeners: [EventTarget, string, (event: any) => unknown][] = [];

    private didMoveOrResize: boolean = false;
    private startMoveGridBoxCoordinates = { x0: 0, y0: 0, x1: 0, y1: 0 };

    public selectedComponentChange$: Subject<ComponentState | undefined> = new Subject();
    public cellClick$: Subject<{ x: number, y: number }> = new Subject();
    public moveOrResizeEnd$: Subject<void> = new Subject();
    public componentRightClick$: Subject<ComponentState> = new Subject();
    public componentDoubleClick$: Subject<ComponentState> = new Subject();

    public constructor(containerElement: HTMLElement, initialState: State) {
        this.containerElement = containerElement;

        this.setEventListener(containerElement, 'contextmenu', (event: Event) => event.preventDefault());
        this.setEventListener(window, 'pointermove', (event: MouseEvent) => this.onPointerMove(event));
        this.setEventListener(window, 'touchmove', (event: TouchEvent) => this.onPointerMove(event));
        this.setEventListener(window, 'mouseup', () => this.onPointerCancel());
        this.setEventListener(window, 'pointerup', () => this.onPointerCancel());
        this.setEventListener(window, 'touchcancel', () => this.onPointerCancel());
        this.setEventListener(window, 'touchend', () => this.onPointerCancel());

        this.syncState(initialState);
    }

    public destroy(): void {
        for (const [element, eventName, handler] of this.eventListeners) {
            element.removeEventListener(eventName, handler, false);
        }

        this.clearGridState();
    }

    public syncState(state: State): void {
        this.clearGridState();

        this.gridWidth = state.width;
        this.gridHeight = state.height;
        this.addGridCells();
        state.components.forEach(x => this.addComponent(x));
    }

    public highlightComponent(component: ComponentState): void {
        const gridComponent = this.gridComponents.find(x => x.component === component);
        gridComponent?.highlight();
    }

    public getSelectedComponent(): ComponentState | undefined {
        return this.selectedGridComponent?.component;
    }

    public selectComponent(component?: ComponentState): void {
        const gridComponent = this.gridComponents.find(x => x.component === component);
        this.selectGridComponent(gridComponent);
    }

    public addComponent(component: ComponentState): void {
        const gridComponent = new GridComponent(component);

        gridComponent.setEventListener('dblclick', () => {
            this.componentDoubleClick$.next(gridComponent.component)
        });

        gridComponent.setEventListener('pointerdown', (event: PointerEvent) => {
            if (event.button === 2) {
                this.componentRightClick$.next(gridComponent.component);
                return;
            }

            this.selectGridComponent(gridComponent);
        });

        this.containerElement.appendChild(gridComponent.htmlElement);
        this.gridComponents.push(gridComponent);
    }

    public removeComponent(component: ComponentState): void {
        const index = this.gridComponents.findIndex(x => x.component === component);
        if (index < 0)
            return;

        const gridComponent = this.gridComponents[index];

        if (this.selectedGridComponent === gridComponent)
            this.selectGridComponent(undefined);

        gridComponent.destroy();
        this.gridComponents.splice(index, 1);
    }

    public updateComponent(component?: ComponentState): void {
        const index = this.gridComponents.findIndex(x => x.component === component);
        if (index < 0)
            return;

        const gridComponent = this.gridComponents[index];
        gridComponent.update();
    }

    private clearGridState(): void {
        this.gridSelectionBox?.destroy();
        this.gridComponents.forEach(x => x.destroy());
        this.gridCells.forEach(x => x.destroy());

        this.gridComponents.length = 0;
        this.gridCells.length = 0;
        this.selectedGridComponent = undefined;
        this.gridSelectionBox = undefined;
        this.gridSelectionBoxCorner = undefined;
        this.movingSelection = false;
        this.didMoveOrResize = false;
    }

    private setEventListener(element: EventTarget, eventName: string, handler: (event: any) => unknown): void {
        this.eventListeners.push([element, eventName, handler]);
        element.addEventListener(eventName, handler, { passive: false });
    }

    private onPointerMove(event: MouseEvent | TouchEvent): void {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (event instanceof MouseEvent) {
            this.pointerPosition.x = event.pageX;
            this.pointerPosition.y = event.pageY;
            this.moveCorner();
            this.moveSelection();
        } else if (event.touches[0]) {
            this.pointerPosition.x = event.touches[0].pageX;
            this.pointerPosition.y = event.touches[0].pageY;
            this.moveCorner();
            this.moveSelection();
        }
    }

    private onPointerCancel(): void {
        this.gridSelectionBoxCorner = undefined;
        this.movingSelection = false;

        if (this.didMoveOrResize && this.gridSelectionBox) {
            const { x0, y0, x1, y1 } = this.startMoveGridBoxCoordinates;
            const current = this.getGridBoxCoordinates(this.gridSelectionBox);
            if (current.x0 !== x0 || current.x1 !== x1 || current.y0 !== y0 || current.y1 !== y1) {
                this.moveOrResizeEnd$.next();
            }
        }

        this.didMoveOrResize = false;
    }

    private addGridCells(): void {
        this.containerElement.style.gridTemplateColumns = `repeat(${this.gridWidth}, 1fr)`;
        this.containerElement.style.gridTemplateRows = `repeat(${this.gridHeight}, 1fr)`;

        for (let i = 0; i < this.gridWidth * this.gridHeight; i++) {
            const x = i % this.gridWidth;
            const y = Math.floor(i / this.gridWidth);

            const gridCell = new GridCell(x, y);
            gridCell.setEventListener('pointerdown', () => {
                if (this.selectedGridComponent)
                    this.selectGridComponent(undefined);
                else
                    this.cellClick$.next({ x, y });
            });

            this.containerElement.appendChild(gridCell.htmlElement);
            this.gridCells.push(gridCell);
        }
    }

    private selectGridComponent(gridComponent?: GridComponent): void {
        if (this.selectedGridComponent === gridComponent)
            return;

        this.gridSelectionBox?.destroy();
        this.selectedGridComponent?.unselect();
        this.selectedGridComponent = gridComponent;
        this.gridSelectionBox = undefined;
        this.gridSelectionBoxCorner = undefined;
        this.movingSelection = false;

        if (!this.selectedGridComponent) {
            this.selectedComponentChange$.next(undefined);
            return;
        }

        this.selectedGridComponent.select();
        this.gridSelectionBox = new GridSelectionBox(this.selectedGridComponent);

        // TODO: dblclick seems to behave weirdly on mobile sometimes?
        /*this.gridSelectionBox.setEventListener('dblclick', () => {
            this.componentDoubleClick$.next(this.selectedGridComponent!.component)
        });*/

        this.gridSelectionBox.setEventListener('pointerdown', (event: PointerEvent) => {
            if (event.button === 2) {
                this.componentRightClick$.next(this.selectedGridComponent!.component);
                return;
            }

            const { x, y } = this.gridSelectionBox!.htmlElement.getBoundingClientRect();
            this.startMovePosition.x = event.pageX - x;
            this.startMovePosition.y = event.pageY - y;
            this.pointerPosition.x = event.pageX;
            this.pointerPosition.y = event.pageY;
            this.movingSelection = true;
            this.startMoveGridBoxCoordinates = this.getGridBoxCoordinates(this.gridSelectionBox!);
        });

        for (const corner of this.gridSelectionBox.corners) {
            corner.setEventListener('pointerdown', (event: PointerEvent) => {
                this.pointerPosition.x = event.pageX;
                this.pointerPosition.y = event.pageY;
                this.gridSelectionBoxCorner = corner;
                this.startMoveGridBoxCoordinates = this.getGridBoxCoordinates(this.gridSelectionBox!);
            });
        }

        this.containerElement.appendChild(this.gridSelectionBox.htmlElement);
        this.selectedComponentChange$.next(this.selectedGridComponent.component);
    }

    private moveSelection(): void {
        if (!this.movingSelection || !this.gridSelectionBox)
            return;

        const gap = 3; // as defined in CSS
        const boxRect = this.gridSelectionBox.htmlElement.getBoundingClientRect();
        const cellRect = this.gridCells[0].htmlElement.getBoundingClientRect();
        const cellWidth = cellRect.width + gap;
        const cellHeight = cellRect.height + gap;
        const cellCountX = Math.ceil(boxRect.width / cellWidth);
        const cellCountY = Math.ceil(boxRect.height / cellHeight);

        const continuousDeltaX = this.pointerPosition.x - (boxRect.x + this.startMovePosition.x);
        const continuousDeltaY = this.pointerPosition.y - (boxRect.y + this.startMovePosition.y);
        const discreteDeltaX = Math.round(continuousDeltaX / cellWidth);
        const discreteDeltaY = Math.round(continuousDeltaY / cellHeight);

        const { x0, y0, x1, y1 } = this.getGridBoxCoordinates(this.gridSelectionBox);
        const newX0 = Math.max(1, Math.min(x0 + discreteDeltaX, this.gridWidth + 1 - cellCountX));
        const newY0 = Math.max(1, Math.min(y0 + discreteDeltaY, this.gridHeight + 1 - cellCountY));
        const newX1 = newX0 + cellCountX;
        const newY1 = newY0 + cellCountY;

        if (x0 === newX0 && x1 === newX1 && y0 === newY0 && y1 === newY1)
            return;

        this.gridSelectionBox.htmlElement.style.gridColumnStart = `${newX0}`;
        this.gridSelectionBox.htmlElement.style.gridColumnEnd = `${newX1}`;
        this.gridSelectionBox.htmlElement.style.gridRowStart = `${newY0}`;
        this.gridSelectionBox.htmlElement.style.gridRowEnd = `${newY1}`;

        this.onSelectionAreaUpdate();
    }

    private moveCorner(): void {
        if (!this.gridSelectionBox || !this.gridSelectionBoxCorner)
            return;

        const gap = 3; // as defined in CSS
        const cellRect = this.gridCells[0].htmlElement.getBoundingClientRect();
        const cellWidth = cellRect.width + gap;
        const cellHeight = cellRect.height + gap;

        const cornerRect = this.gridSelectionBoxCorner.htmlElement.getBoundingClientRect();
        const continuousDeltaX = this.pointerPosition.x - (cornerRect.x + cornerRect.width / 2);
        const continuousDeltaY = this.pointerPosition.y - (cornerRect.y + cornerRect.height / 2);
        const discreteDeltaX = Math.round(continuousDeltaX / cellWidth);
        const discreteDeltaY = Math.round(continuousDeltaY / cellHeight);

        const { x0, y0, x1, y1 } = this.getGridBoxCoordinates(this.gridSelectionBox);
        const newX0 = Math.max(1, Math.min(x0 + discreteDeltaX, x1 - 1));
        const newX1 = Math.max(x0 + 1, Math.min(x1 + discreteDeltaX, this.gridWidth + 1));
        const newY0 = Math.max(1, Math.min(y0 + discreteDeltaY, y1 - 1));
        const newY1 = Math.max(y0 + 1, Math.min(y1 + discreteDeltaY, this.gridHeight + 1));

        if (x0 === newX0 && x1 === newX1 && y0 === newY0 && y1 === newY1)
            return;

        switch (this.gridSelectionBox.corners.indexOf(this.gridSelectionBoxCorner)) {
            case 0:
                this.gridSelectionBox.htmlElement.style.gridColumnStart = `${newX0}`;
                this.gridSelectionBox.htmlElement.style.gridRowStart = `${newY0}`;
                break;
            case 1:
                this.gridSelectionBox.htmlElement.style.gridColumnStart = `${newX0}`;
                this.gridSelectionBox.htmlElement.style.gridRowEnd = `${newY1}`;
                break;
            case 2:
                this.gridSelectionBox.htmlElement.style.gridColumnEnd = `${newX1}`;
                this.gridSelectionBox.htmlElement.style.gridRowStart = `${newY0}`;
                break;
            case 3:
                this.gridSelectionBox.htmlElement.style.gridColumnEnd = `${newX1}`;
                this.gridSelectionBox.htmlElement.style.gridRowEnd = `${newY1}`;
                break;
        }

        this.onSelectionAreaUpdate();
    }

    private onSelectionAreaUpdate(): void {
        if (!this.gridSelectionBox || !this.selectedGridComponent)
            return;

        const { x0, y0, x1, y1 } = this.getGridBoxCoordinates(this.gridSelectionBox);

        const componentBox = this.selectedGridComponent.htmlElement;
        componentBox.style.gridColumnStart = `${x0}`;
        componentBox.style.gridColumnEnd = `${x1}`;
        componentBox.style.gridRowStart = `${y0}`;
        componentBox.style.gridRowEnd = `${y1}`;

        this.selectedGridComponent.component.x0 = x0;
        this.selectedGridComponent.component.x1 = x1;
        this.selectedGridComponent.component.y0 = y0;
        this.selectedGridComponent.component.y1 = y1;

        this.didMoveOrResize = true;
    }

    private getGridBoxCoordinates(element: GridElement): { x0: number, y0: number, x1: number, y1: number } {
        const gridBox = element.htmlElement;
        const x0 = +gridBox.style.gridColumnStart;
        const x1 = +gridBox.style.gridColumnEnd;
        const y0 = +gridBox.style.gridRowStart;
        const y1 = +gridBox.style.gridRowEnd;
        return { x0, y0, x1, y1 };
    }
}
