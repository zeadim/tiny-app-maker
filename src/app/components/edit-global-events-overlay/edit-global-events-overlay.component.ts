import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { GlobalEventState } from 'src/app/types/state';
import { globalEventList } from 'src/config/global-event-list';

@Component({
  selector: 'app-edit-global-events-overlay',
  templateUrl: './edit-global-events-overlay.component.html',
  styleUrls: ['./edit-global-events-overlay.component.scss']
})
export class EditGlobalEventsOverlayComponent implements OnInit {

    public selectedEventIndex: number = 0;
    public editModalOpen: boolean = false;

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();
    
    @ViewChild('eventList') public eventList!: ElementRef<HTMLElement>;

    public get GlobalEvents(): GlobalEventState[] {
        return this.stateService.getCurrentState().globalEvents ?? [];
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
    }

    public closeModal(): void {
        this.onClose.emit();
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
        this.scrollSelectionEventEntryIntoView();
    }

    public addEvent(): void {
        this.addPlaceholderEvent(false);
        this.selectedEventIndex = this.GlobalEvents.length - 1;
        this.scrollSelectionEventEntryIntoView();
    }

    public moveSelectedEventUp(): void {
        if (this.selectedEventIndex <= 0)
            return;

        const event = this.GlobalEvents[this.selectedEventIndex];
        this.GlobalEvents[this.selectedEventIndex] = this.GlobalEvents[this.selectedEventIndex - 1]
        this.GlobalEvents[this.selectedEventIndex - 1] = event;
        this.selectedEventIndex -= 1;
        this.scrollSelectionEventEntryIntoView();
    }

    public moveSelectedEventDown(): void {
        if (this.selectedEventIndex >= this.GlobalEvents.length - 1)
            return;

        const action = this.GlobalEvents[this.selectedEventIndex];
        this.GlobalEvents[this.selectedEventIndex] = this.GlobalEvents[this.selectedEventIndex + 1]
        this.GlobalEvents[this.selectedEventIndex + 1] = action;
        this.selectedEventIndex += 1;
        this.scrollSelectionEventEntryIntoView();
    }

    public openEditModal(): void {
        this.editModalOpen = true;
    }

    public onEditModalClose(): void {
        this.editModalOpen = false;
    }

    private addPlaceholderEvent(onlyWhenEmpty: boolean): void {
        if (!onlyWhenEmpty || this.GlobalEvents.length === 0)
            // @ts-ignore
            this.GlobalEvents.push({ name: 'app-start', inputs: [], events: [] });
    }

    private scrollSelectionEventEntryIntoView(): void {
        setTimeout(() => {
            const element = this.eventList.nativeElement.children.item(this.selectedEventIndex);
            element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}
