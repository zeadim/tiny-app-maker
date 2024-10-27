import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentState } from '../../types/state';
import { componentList } from '../../../config/component-list';
import { ComponentConfiguration, EventConfiguration } from '../../../config/types';

@Component({
    selector: 'app-component-configuration',
    templateUrl: './component-configuration.component.html',
    styleUrls: ['./component-configuration.component.scss']
})
export class ComponentConfigurationComponent implements OnInit {

    public config!: ComponentConfiguration;
    public componentGroups: { name: string, options: ComponentConfiguration[] }[] = [];
    public events: EventConfiguration[] = [];
    public selectedEvent!: EventConfiguration;
    public savedComponentStates: Map<string, ComponentState> = new Map();

    @Input('component') public component!: ComponentState;

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();

    public get SelectedComponentType(): string {
        return this.component.name;
    }

    public set SelectedComponentType(type: string) {
        this.savedComponentStates.set(this.component.name, { ...this.component });

        this.component.name = type;

        const component = this.savedComponentStates.get(type);
        this.component.inputs = component?.inputs ?? [];
        this.component.events = component?.events ?? [];
        
        this.loadComponentType();
    }

    public get SelectedEvent(): EventConfiguration {
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
        this.config = componentList.find(x => x.name === this.component.name)!;

        this.events = [{
            name: 'settings',
            label: 'Settings',
        }];

        for (const event of this.config.events) {
            this.events.push({ name: '', label: '' });
            this.events.push(event);
        }

        this.selectedEvent = this.events[0];
    }
}
