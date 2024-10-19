import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
import { StateService } from '../../services/state.service';
import { GridEditor } from './grid-editor/grid-editor';
import { ComponentState, State } from '../../types/state';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, AfterViewInit, OnDestroy {

    public hasSelection: boolean = false;
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
        public readonly changeDetectorRef: ChangeDetectorRef,
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
        this.stateService.undo();
        this.gridEditor?.syncState(this.State);
    }

    public performRedo(): void {
        this.stateService.redo();
        this.gridEditor?.syncState(this.State);
    }

    public deleteSelectedComponent(): void {
        if (!this.SelectedComponent)
            return;

        const index = this.State.components.indexOf(this.SelectedComponent);
        if (index >= 0) {
            this.gridEditor?.removeComponent(this.SelectedComponent);
            this.State.components.splice(index, 1);
            this.stateService.push();
        }
    }

    public editSelectedComponent(): void {
        if (!this.SelectedComponent)
            return;

        // ...
    }

    public unselectSelectedComponent(): void {
        this.gridEditor?.selectComponent(undefined);
    }

    private createGridEditor(): void {
        this.gridEditorSubscription.unsubscribe();
        this.gridEditorSubscription = new Subscription();

        this.ngZone.runOutsideAngular(() => {
            this.gridEditor?.destroy();
            this.gridEditor = new GridEditor(this.gridElementRef.nativeElement, this.State);
            this.gridEditorSubscription.add(this.gridEditor.selectedComponentChange$.subscribe(() => this.changeDetectorRef.detectChanges()));
            this.gridEditorSubscription.add(this.gridEditor.cellClick$.subscribe(x => this.createNewComponent(x.x, x.y)));
            this.gridEditorSubscription.add(this.gridEditor.moveOrResizeEnd$.subscribe(() => this.stateService.push()));
        });
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
    }
}
