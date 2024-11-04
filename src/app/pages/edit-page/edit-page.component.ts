import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { StateService } from '../../services/state.service';
import { GridEditor } from './grid-editor/grid-editor';
import { ComponentState, State } from '../../types/state';
import { initialState as debugInitialState } from '../initial-state';
import { componentList } from 'src/config/component-list';
import { EditorService } from 'src/app/services/editor.service';
import { globalEventList } from 'src/config/global-event-list';

/*
TODO:
- how to work with booleans (conditions, truthy/falsy values as well as checkbox inputs)? Separate type or 0 and 1?
- how to handle different app types, like file (image/video/audio) etc.? Also via ID like web sockets?
- improve UI: more uniform colors (inputs <-> action list + event buttons, background, header/footer buttons etc.)
- use proper icons from a package/svgs instead of emojis/unicode
- check error handling in app components & actions (always try-catch, or also put it where invoked?)
- check TODOs
*/

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, AfterViewInit, OnDestroy {

    public componentModalOpen: boolean = false;
    public globalEventsModalOpen: boolean = false;
    public appRunning: boolean = false;
    public selectedComponentSnapshot: string = '';
    public appHtmlTemplateString?: string;

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

    public get ModalOpen(): boolean {
        return this.componentModalOpen || this.globalEventsModalOpen;
    }

    public constructor(
        public readonly editorService: EditorService,
        public readonly stateService: StateService,
        public readonly ngZone: NgZone,
    ) {
        //
    }

    public ngOnInit(): void {
        const initialState = {
            width: 6,
            height: 10,
            components: [],
        };
        this.stateService.setInitialState(debugInitialState);

        fromEvent<KeyboardEvent>(window, 'keydown')
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: KeyboardEvent) => this.onKeyDown(event));

        this.loadAppTemplate();

        // TODO: for debugging
        // @ts-ignore
        window.setState = (state) => {
            this.stateService.setInitialState(state);
            this.gridEditor?.syncState(state);
        };
    }

    private async loadAppTemplate(): Promise<void> {
        try {
            const response = await fetch('./assets/index.html');

            if (!response.ok) {
                // TODO: only added to make it work with GitHub Pages for now (to be removed)
                const response = await fetch('./tiny-app-maker/assets/index.html');
                this.appHtmlTemplateString = await response.text();
                return;
            }

            this.appHtmlTemplateString = await response.text();
        } catch (err) {
            // TODO: retry?
        }
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

        this.openComponentModal();
        this.selectedComponentSnapshot = JSON.stringify(this.SelectedComponent);
    }

    public editGlobalEvents(): void {
        this.openGlobalEventsModal();
        // TODO: globalevents insteadof component snapshot
        //this.selectedComponentSnapshot = JSON.stringify(this.SelectedComponent);
    }

    public unselectSelectedComponent(): void {
        this.gridEditor?.selectComponent(undefined);
    }

    public openComponentModal(): void {
        this.editorService.componentList = componentList;
        this.componentModalOpen = true;
        this.gridEditor?.deactivate();
    }

    public closeComponentModal(): void {
        this.componentModalOpen = false;
        this.gridEditor?.activate();
    }

    public openGlobalEventsModal(): void {
        this.editorService.componentList = globalEventList;
        this.globalEventsModalOpen = true;
        this.gridEditor?.deactivate();
    }

    public closeGlobalEventsModal(): void {
        this.globalEventsModalOpen = false;
        this.gridEditor?.activate();
    }

    public onEditComponentOverlayClose(): void {
        this.closeComponentModal();

        // setTimeout to make modal components' OnDestroy be called first for cleaning up empty inputs
        setTimeout(() => {
            if (this.selectedComponentSnapshot === JSON.stringify(this.SelectedComponent))
                return;

            this.stateService.push();
            this.gridEditor?.updateComponent(this.SelectedComponent);
        });
    }

    public onEditGlobalEventsOverlayClose(): void {
        this.closeGlobalEventsModal();

        // TODO: push state, but check globalevents instead
        // setTimeout to make modal components' OnDestroy be called first for cleaning up empty inputs
        /*setTimeout(() => {
            if (this.selectedComponentSnapshot === JSON.stringify(this.SelectedComponent))
                return;

            this.stateService.push();
            this.gridEditor?.updateComponent(this.SelectedComponent);
        });*/
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
        // Keep this subscription to trigger change detection! 
        // (TODO: fix this so it is not *needed* for change detection)
        if (!component)
            return;

        const index = this.State.components.indexOf(component);
        if (index < 0)
            return;

        this.State.components.splice(index, 1);
        this.State.components.push(component);
    }

    private createNewComponent(x: number, y: number): void {
        const component: ComponentState = {
            name: 'cell',
            x0: x + 1,
            y0: y + 1,
            x1: x + 2,
            y1: y + 2,
            inputs: [],
            events: [],
        };

        this.stateService.getCurrentState().components.push(component);
        this.stateService.push();

        this.gridEditor?.addComponent(component);
        this.gridEditor?.selectComponent(component);
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.goBack();
        }

        if (this.ModalOpen)
            return;

        if (event.ctrlKey && event.key === 'z') {
            event.preventDefault();
            this.performUndo();
        }

        if (event.ctrlKey && event.key === 'y') {
            event.preventDefault();
            this.performRedo();
        }
    }

    private goBack(): void {
        if (this.ModalOpen) { // any modal open
            this.closeComponentModal();
            return;
        }

        this.unselectSelectedComponent();
    }

    // TODO: remove, just for debugging
    public test(): void {
        console.log(this.State);
    }

    public runApp(): void {
        if (this.appRunning) {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                iframe.src = ''; // needed to trigger onbeforeunload event in iframe
                iframe.remove();
            }

            this.gridEditor?.activate();
            this.appRunning = false;
            return;
        }

        if (!this.appHtmlTemplateString)
            return;

        const json = JSON.stringify(this.State);
        const html = this.appHtmlTemplateString?.replace(' id="%APP_CONFIG%">', `>window.appConfig = ${json}`);
        const blob = new Blob([html], { type: 'text/html' });
        const src = URL.createObjectURL(blob);

        if (false /*openInNewTab*/) {
            window.open(src, '_blank');
        } else {
            const iframe = document.createElement('iframe');

            iframe.setAttribute('frameBorder', '0');
            iframe.setAttribute('src', src);
            iframe.style.gridColumnStart = '1';
            iframe.style.gridRowStart = '1';
            iframe.style.gridColumnEnd = `${this.State.width + 1}`;
            iframe.style.gridRowEnd = `${this.State.height + 1}`;
            iframe.classList.add('app-frame');

            this.gridEditor?.deactivate();
            this.gridElementRef.nativeElement.appendChild(iframe);
            this.appRunning = true;
        }
    }
}
