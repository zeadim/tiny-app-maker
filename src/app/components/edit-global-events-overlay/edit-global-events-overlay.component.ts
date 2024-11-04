import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { GlobalEventState } from 'src/app/types/state';
import { globalEventList } from 'src/config/global-event-list';

@Component({
  selector: 'app-edit-global-events-overlay',
  templateUrl: './edit-global-events-overlay.component.html',
  styleUrls: ['./edit-global-events-overlay.component.scss']
})
export class EditGlobalEventsOverlayComponent {

    public selectedEventIndex: number = 0;

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();
    
    @ViewChild('eventList') public eventList!: ElementRef<HTMLElement>;

    public get GlobalEvents(): GlobalEventState[] {
        return this.stateService.getCurrentState().globalEvents ?? [];
    }

    public constructor(
        public readonly stateService: StateService,
    ) {
        //
    }

    public closeModal(): void {
        this.onClose.emit();
    }

    public selectEvent(index: number): void {
        this.selectedEventIndex = index;
        this.scrollSelectionEventEntryIntoView();
    }

    public getEventLabel(event: GlobalEventState): string {
        if (event.name === 'goto')
            return `go to action ${event.inputs[0].value ?? 1}`; // special case

        if (event.name === 'interval') {
            return `interval (${event.inputs[0].value ?? 1} second${(event.inputs[0].value ?? 1) == 1 ? '' : 's'})`;
        }

        if (event.name === 'variable-change') {
            return `variable change (${event.inputs[0].value ?? 'any'})`;
        }

        const label = globalEventList.find(x => x.name === event.name)?.label ?? 'unknown';
        return `on ${label}`;
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

    private scrollSelectionEventEntryIntoView(): void {
        setTimeout(() => {
            const element = this.eventList.nativeElement.children.item(this.selectedEventIndex);
            element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}
