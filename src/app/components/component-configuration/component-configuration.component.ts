import { Component, Input, OnInit } from '@angular/core';
import { ComponentState } from 'src/app/types/state';
import { componentList } from 'src/config/component-list';
import { ComponentConfiguration, EventConfiguration } from 'src/config/types';

@Component({
  selector: 'app-component-configuration',
  templateUrl: './component-configuration.component.html',
  styleUrls: ['./component-configuration.component.scss']
})
export class ComponentConfigurationComponent implements OnInit {

    public config!: ComponentConfiguration;
    public events: EventConfiguration[] = [];

    @Input('component') public component!: ComponentState;

    public ngOnInit(): void {
        this.config = componentList.find(x => x.type === this.component.type)!;

        this.events.push({
            name: 'settings',
            label: 'Settings',
        }, ...this.config.events);
    }
}
