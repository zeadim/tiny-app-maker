import { Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { ActionState, ComponentState, EventState } from '../../types/state';
import { EventConfiguration } from '../../../config/types';
import { actionList } from '../../../config/action-list';

@Component({
    selector: 'app-event-configuration',
    templateUrl: './event-configuration.component.html',
    styleUrls: ['./event-configuration.component.scss']
})
export class EventConfigurationComponent implements OnChanges, OnDestroy {

    public selectedActionIndex: number = 0;
    public event!: EventState;

    @Input('config') public config!: EventConfiguration;
    @Input('component') public component!: ComponentState;

    @ViewChild('actionList') public actionList!: ElementRef<HTMLElement>;

    public get SelectedAction(): ActionState {
        return this.event.actions[this.selectedActionIndex];
    }

    // ngOnChanges instead of ngOnInit because update required each time input changes
    // (similar to using setter on @Input('config') with same body as ngOnInit, I suppose)
    public ngOnChanges(): void {
        let event = this.component.events.find(x => x.name === this.config.name);
        if (!event) {
            event = { name: this.config.name, actions: [] };
            this.component.events.push(event);
        }

        this.event = event;
        this.selectedActionIndex = 0;
        this.addPlaceholderAction(true);
    }

    public ngOnDestroy(): void {
        this.event.actions = this.event.actions.filter(x => x.name !== 'do-nothing');

        if (this.event.actions.length === 0) {
            const index = this.component.events.indexOf(this.event);
            this.component.events.splice(index, 1);
        }
    }

    public getActionLabel(action: ActionState): string {
        if (action.name === 'goto')
            return `go to action ${action.inputs[0].value ?? 1}`; // special case

        return actionList.find(x => x.name === action.name)?.label ?? 'unknown';
    }

    public selectAction(index: number): void {
        this.selectedActionIndex = index;
        this.scrollSelectionActionEntryIntoView();
    }

    public deleteSelectedAction(): void {
        this.event.actions.splice(this.selectedActionIndex, 1);
        this.addPlaceholderAction(true);
        this.selectedActionIndex = Math.max(0, this.selectedActionIndex - 1);
        this.scrollSelectionActionEntryIntoView();
    }

    public addAction(): void {
        this.addPlaceholderAction(false);
        this.selectedActionIndex = this.event.actions.length - 1;
        this.scrollSelectionActionEntryIntoView();
    }

    public moveSelectedActionUp(): void {
        if (this.selectedActionIndex <= 0)
            return;

        const action = this.event.actions[this.selectedActionIndex];
        this.event.actions[this.selectedActionIndex] = this.event.actions[this.selectedActionIndex - 1]
        this.event.actions[this.selectedActionIndex - 1] = action;
        this.selectedActionIndex -= 1;
        this.scrollSelectionActionEntryIntoView();
    }

    public moveSelectedActionDown(): void {
        if (this.selectedActionIndex >= this.event.actions.length - 1)
            return;

        const action = this.event.actions[this.selectedActionIndex];
        this.event.actions[this.selectedActionIndex] = this.event.actions[this.selectedActionIndex + 1]
        this.event.actions[this.selectedActionIndex + 1] = action;
        this.selectedActionIndex += 1;
        this.scrollSelectionActionEntryIntoView();
    }

    private addPlaceholderAction(onlyWhenEmpty: boolean): void {
        if (!onlyWhenEmpty || this.event.actions.length === 0)
            this.event.actions.push({ name: 'do-nothing', inputs: [] });
    }

    private scrollSelectionActionEntryIntoView(): void {
        setTimeout(() => {
            const element = this.actionList.nativeElement.children.item(this.selectedActionIndex);
            element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}
