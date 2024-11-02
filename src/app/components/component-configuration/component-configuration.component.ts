import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ComponentState } from '../../types/state';
import { componentList } from '../../../config/component-list';
import { ComponentConfiguration, EventConfiguration, InputConfiguration } from '../../../config/types';
import { Subscription } from 'rxjs';
import { EditorService } from 'src/app/services/editor.service';

@Component({
    selector: 'app-component-configuration',
    templateUrl: './component-configuration.component.html',
    styleUrls: ['./component-configuration.component.scss']
})
export class ComponentConfigurationComponent implements OnInit, OnDestroy {

    public config!: ComponentConfiguration;
    public componentGroups: { name: string, options: ComponentConfiguration[] }[] = [];
    public events: EventConfiguration[] = [];
    public selectedEvent!: EventConfiguration;
    public savedComponentStates: Map<string, ComponentState> = new Map();
    public subscription: Subscription = new Subscription();
    public configInputs: InputConfiguration[] = [];

    @Input('component') public component!: ComponentState;

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();

    public get SelectedComponentType(): string {
        return this.component.name;
    }

    public set SelectedComponentType(type: string) {
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

    public get IsSettingsTabOpen(): boolean {
        return this.selectedEvent.name === 'settings';
    }

    public constructor(
        public readonly editorService: EditorService,
    ) {
        //
    }

    public ngOnInit(): void {
        this.subscription.add(this.editorService.copy$.subscribe(() => {
            if (!this.IsSettingsTabOpen)
                return;

            this.editorService.setClipboardState(this.component);
        }));

        this.subscription.add(this.editorService.paste$.subscribe(() => {
            if (!this.IsSettingsTabOpen)
                return;

            const clipboardState = this.editorService.getClipboardState();
            if (!clipboardState)
                return;

            if (this.component.name !== clipboardState.component.name) {
                Object.assign(this.component, clipboardState.component);
            } else {
                this.component.inputs = clipboardState.component.inputs;
            }
            
            this.editorService.setClipboardState(clipboardState.component, clipboardState.action);
            this.loadComponentType();
        }));

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

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    private loadComponentType(): void {
        this.savedComponentStates.set(this.component.name, { ...this.component });
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
        this.configInputs = this.config.inputs.map(x => ({ ...x }));
    }
}
