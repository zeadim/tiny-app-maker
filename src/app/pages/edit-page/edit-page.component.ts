import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { StateService } from '../../services/state.service';
import { GridEditor } from './grid-editor/grid-editor';
import { ComponentState, State } from '../../types/state';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, AfterViewInit, OnDestroy {

    public componentModalOpen: boolean = false;
    public selectedComponentSnapshot: string = '';

    public gridEditor?: GridEditor;
    public gridEditorSubscription: Subscription = new Subscription();

    public destroy$: Subject<void> = new Subject();

    @ViewChild('grid') public gridElementRef!: ElementRef<HTMLDivElement>;

    public get SelectedComponent(): ComponentState | undefined {
        return this.gridEditor?.getSelectedComponent();
    }

    public get State(): State {
        return this.stateService.getCurrentState();
    }

    public constructor(
        public readonly stateService: StateService,
        public readonly ngZone: NgZone,
    ) {
        //
    }

    public ngOnInit(): void {
        const initialState = {
            width: 6,
            height: 10,
            components: [

            ],
        };
        this.stateService.setInitialState(initialState);

        fromEvent<KeyboardEvent>(window, 'keydown')
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: KeyboardEvent) => this.onKeyDown(event));
    }

    public ngAfterViewInit(): void {
        this.createGridEditor();
    }

    public ngOnDestroy(): void {
        this.gridEditorSubscription.unsubscribe();
        this.destroy$.next();
    }

    public performUndo(): void {
        const changedComponent = this.stateService.undo();
        this.gridEditor?.syncState(this.State);

        if (changedComponent)
            this.gridEditor?.highlightComponent(changedComponent);
    }

    public performRedo(): void {
        const changedComponent = this.stateService.redo();
        this.gridEditor?.syncState(this.State);
        
        if (changedComponent)
            this.gridEditor?.highlightComponent(changedComponent);
    }

    public deleteComponent(component?: ComponentState): void {
        if (!component)
            return;

        const index = this.State.components.indexOf(component);
        if (index >= 0) {
            this.gridEditor?.removeComponent(component);
            this.State.components.splice(index, 1);
            this.stateService.push();
        }
    }

    public editSelectedComponent(): void {
        if (!this.SelectedComponent)
            return;

        this.componentModalOpen = true;
        this.selectedComponentSnapshot = JSON.stringify(this.SelectedComponent);
    }

    public unselectSelectedComponent(): void {
        this.gridEditor?.selectComponent(undefined);
    }

    public onEditComponentOverlayClose(): void {
        this.componentModalOpen = false;

        // TODO: fails if e.g. previously empty event is populated on edit modal open
        if (this.selectedComponentSnapshot === JSON.stringify(this.SelectedComponent))
            return;

        this.stateService.push();
        this.gridEditor?.updateComponent(this.SelectedComponent);
    }

    private createGridEditor(): void {
        this.gridEditorSubscription.unsubscribe();
        this.gridEditorSubscription = new Subscription();

        this.ngZone.runOutsideAngular(() => {
            this.gridEditor?.destroy();
            this.gridEditor = new GridEditor(this.gridElementRef.nativeElement, this.State);
            this.addGridEditorSubscription(this.gridEditor.selectedComponentChange$, x => this.onSelectedComponentChange(x));
            this.addGridEditorSubscription(this.gridEditor.cellClick$, x => this.createNewComponent(x.x, x.y));
            this.addGridEditorSubscription(this.gridEditor.moveOrResizeEnd$, () => this.stateService.push());
            this.addGridEditorSubscription(this.gridEditor.componentRightClick$, (x) => this.deleteComponent(x));
            this.addGridEditorSubscription(this.gridEditor.componentDoubleClick$, () => this.editSelectedComponent());
        });
    }

    private addGridEditorSubscription<T>(observable: Observable<T>, callback: (x: T) => unknown): void {
        this.gridEditorSubscription.add(observable.subscribe(x => this.ngZone.run(() => callback(x))));
    }

    private onSelectedComponentChange(component?: ComponentState): void {
        if (!component)
            this.componentModalOpen = false;
    }

    private createNewComponent(x: number, y: number): void {
        const component: ComponentState = {
            type: 'button',
            x0: x + 1,
            y0: y + 1,
            x1: x + 2,
            y1: y + 2,
            inputs: [],
            outputs: [],
            events: [],
        };

        this.stateService.getCurrentState().components.push(component);
        this.stateService.push();

        this.gridEditor?.addComponent(component);
        this.gridEditor?.selectComponent(component);
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (event.ctrlKey && event.key === 'z') {
            event.preventDefault();
            this.stateService.undo();
            this.gridEditor?.syncState(this.State);
        }

        if (event.ctrlKey && event.key === 'y') {
            event.preventDefault();
            this.stateService.redo();
            this.gridEditor?.syncState(this.State);
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            this.goBack();
        }
    }

    private goBack(): void {
        if (this.componentModalOpen) { // any modal open
            this.componentModalOpen = false;
            return;
        }

        this.unselectSelectedComponent();
    }
}
