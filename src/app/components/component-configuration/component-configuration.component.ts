import { Component, Input, OnInit } from '@angular/core';
import { ComponentState, EventState } from '../../types/state';
import { componentList } from '../../../config/component-list';
import { ComponentConfiguration, EventConfiguration } from '../../../config/types';

@Component({
    selector: 'app-component-configuration',
    templateUrl: './component-configuration.component.html',
    styleUrls: ['./component-configuration.component.scss']
})
export class ComponentConfigurationComponent implements OnInit {

    public config!: ComponentConfiguration;
    public events: EventConfiguration[] = [];
    public selectedEvent!: EventConfiguration;
    public selectedEventState!: EventState;
    public componentGroups: { name: string, options: ComponentConfiguration[] }[] = [];

    @Input('component') public component!: ComponentState;

    public get SelectedComponentType(): string {
        return this.component.type;
    }

    public set SelectedComponentType(type: string) {
        this.component.type = type;
        this.loadComponentType();
    }

    public get SelectedEvent(): EventConfiguration {
        this.selectedEventState = this.component.events.find(x => x.name === this.selectedEvent.name)!;
        return this.selectedEvent;
    }

    public set SelectedEvent(event: EventConfiguration) {
        this.selectedEvent = event;
    }

    public ngOnInit(): void {
        for (const component of componentList) {
            const name = component.group ?? '';

            let index = this.componentGroups.findIndex(x => x.name === name);
            if (index < 0) {
                index = this.componentGroups.length;
                this.componentGroups.push({ name, options: [] });
            }

            const options = this.componentGroups[index].options;
            options.push(component);
        }

        this.loadComponentType();
    }

    private loadComponentType(): void {
        this.component.inputs = [];
        this.component.outputs = [];
        this.component.events = [];

        this.config = componentList.find(x => x.type === this.component.type)!;

        this.events = [{
            name: 'settings',
            label: 'Settings',
        }];

        for (const event of this.config.events) {
            this.component.events.push({ name: event.name, actions: [] });
            this.events.push({ name: '', label: '' });
            this.events.push(event);
        }

        this.selectedEvent = this.events[0];
        this.selectedEventState = this.component.events.find(x => x.name === this.selectedEvent.name)!;
    }
}
