import { Component, Input, OnInit } from '@angular/core';
import { ActionState, ComponentState, EventState } from '../../types/state';
import { ActionConfiguration, EventConfiguration } from '../../../config/types';

@Component({
    selector: 'app-event-configuration',
    templateUrl: './event-configuration.component.html',
    styleUrls: ['./event-configuration.component.scss']
})
export class EventConfigurationComponent implements OnInit {

    public currentAction?: ActionState;

    @Input('config') public config!: EventConfiguration;
    @Input('event') public event!: EventState;

    public ngOnInit(): void {
        //

        // TODO: just to test
        this.currentAction = {
            type: 'wait',
            inputs: [],
        };

        this.event.actions.push(this.currentAction);
    }
}
