import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { GlobalEventState } from 'src/app/types/state';
import { globalEventList } from 'src/config/global-event-list';

@Component({
    selector: 'app-edit-global-events-overlay',
    templateUrl: './edit-global-events-overlay.component.html',
    styleUrls: ['./edit-global-events-overlay.component.scss']
})
export class EditGlobalEventsOverlayComponent implements OnInit, OnDestroy {

    public selectedEventIndex: number = 0;
    public editModalOpen: boolean = false;
    public selectedGlobalEventSnapshot: string = '';

    public destroy$: Subject<void> = new Subject();

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();

    @ViewChild('eventList') public eventList!: ElementRef<HTMLElement>;

    public get GlobalEvents(): GlobalEventState[] {
        return this.stateService.globalEvents ?? [];
    }

    public get SelectedEvent(): GlobalEventState {
        return this.GlobalEvents[this.selectedEventIndex];
    }

    public constructor(
        public readonly stateService: StateService,
    ) {
        //
    }

    public ngOnInit(): void {
        this.selectedEventIndex = 0;
        this.addPlaceholderEvent(true);

        fromEvent<KeyboardEvent>(window, 'keydown')
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: KeyboardEvent) => this.onKeyDown(event));
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public closeModal(): void {
        this.onClose.emit();
    }

    public performUndo(): void {
        const changedEvent = this.stateService.undoGlobalEventsState();
        this.GlobalEvents.forEach((x, i) => x.x0 = i);
        this.selectedEventIndex = Math.max(0, Math.min(this.selectedEventIndex, this.GlobalEvents.length - 1));
        setTimeout(() => {
            this.highlightEvent(changedEvent);
            this.addPlaceholderEvent(true);
        });
    }

    public performRedo(): void {
        const changedEvent = this.stateService.redoGlobalEventsState();
        this.GlobalEvents.forEach((x, i) => x.x0 = i);
        this.selectedEventIndex = Math.max(0, Math.min(this.selectedEventIndex, this.GlobalEvents.length - 1));
        setTimeout(() => {
            this.highlightEvent(changedEvent);
            this.addPlaceholderEvent(true);
        });
    }

    private highlightEvent(changedEvent?: GlobalEventState): void {
        if (!changedEvent)
            return;

        const index = this.GlobalEvents.indexOf(changedEvent);
        const element = this.eventList.nativeElement.children.item(index);
        if (!element)
            return;

        element.classList.remove('highlight');
        setTimeout(() => element.classList.add('highlight'));
    }

    public getEventLabel(event: GlobalEventState): string {
        if (event.name === 'interval') {
            return `on interval (${event.inputs?.[0]?.value ?? 1} second${(event.inputs?.[0]?.value ?? 1) == 1 ? '' : 's'})`;
        }

        if (event.name === 'variable-change') {
            return `on variable change (${event.inputs?.[0]?.value ?? ''})`;
        }

        return globalEventList.find(x => x.name === event.name)?.label ?? 'unknown';
    }

    public selectEvent(index: number): void {
        this.selectedEventIndex = index;
        this.scrollSelectionEventEntryIntoView();
    }

    public deleteSelectedEvent(): void {
        this.GlobalEvents.splice(this.selectedEventIndex, 1);
        this.addPlaceholderEvent(true);
        this.selectedEventIndex = Math.max(0, this.selectedEventIndex - 1);

        this.GlobalEvents.forEach((x, i) => x.x0 = i);
        this.stateService.pushGlobalEventsState();
        this.scrollSelectionEventEntryIntoView();
    }

    public addEvent(): void {
        this.addPlaceholderEvent(false);
        this.selectedEventIndex = this.GlobalEvents.length - 1;

        this.stateService.pushGlobalEventsState();
        this.scrollSelectionEventEntryIntoView();
    }

    public moveSelectedEventUp(): void {
        if (this.selectedEventIndex <= 0)
            return;

        const event = this.GlobalEvents[this.selectedEventIndex];
        this.GlobalEvents[this.selectedEventIndex] = this.GlobalEvents[this.selectedEventIndex - 1]
        this.GlobalEvents[this.selectedEventIndex - 1] = event;
        this.selectedEventIndex -= 1;

        this.GlobalEvents.forEach((x, i) => x.x0 = i);
        this.stateService.pushGlobalEventsState();
        this.scrollSelectionEventEntryIntoView();
    }

    public moveSelectedEventDown(): void {
        if (this.selectedEventIndex >= this.GlobalEvents.length - 1)
            return;

        const action = this.GlobalEvents[this.selectedEventIndex];
        this.GlobalEvents[this.selectedEventIndex] = this.GlobalEvents[this.selectedEventIndex + 1]
        this.GlobalEvents[this.selectedEventIndex + 1] = action;
        this.selectedEventIndex += 1;

        this.GlobalEvents.forEach((x, i) => x.x0 = i);
        this.stateService.pushGlobalEventsState();
        this.scrollSelectionEventEntryIntoView();
    }

    public openEditModal(): void {
        this.editModalOpen = true;

        this.selectedGlobalEventSnapshot = JSON.stringify(this.SelectedEvent);
    }

    public onEditModalClose(): void {
        this.editModalOpen = false;

        // setTimeout to make modal components' OnDestroy be called first for cleaning up empty inputs
        setTimeout(() => {
            if (this.selectedGlobalEventSnapshot === JSON.stringify(this.SelectedEvent))
                return;

            this.stateService.pushGlobalEventsState();
        });
    }

    private addPlaceholderEvent(onlyWhenEmpty: boolean): void {
        if (!onlyWhenEmpty || this.GlobalEvents.length === 0) {
            // @ts-ignore
            this.GlobalEvents.push({ name: 'app-start', inputs: [], events: [], x0: this.GlobalEvents.length });
        }
    }

    private scrollSelectionEventEntryIntoView(): void {
        setTimeout(() => {
            const element = this.eventList.nativeElement.children.item(this.selectedEventIndex);
            element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.goBack();
        }

        if (this.editModalOpen)
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
        if (this.editModalOpen) { // any modal open
            this.closeModal();
            return;
        }
    }
}
