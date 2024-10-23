import { Component, Input, OnInit } from '@angular/core';
import { ActionState, ComponentState, EventState } from '../../types/state';
import { ActionConfiguration, EventConfiguration } from '../../../config/types';
import { actionList } from 'src/config/action-list';

@Component({
    selector: 'app-action-configuration',
    templateUrl: './action-configuration.component.html',
    styleUrls: ['./action-configuration.component.scss']
})
export class ActionConfigurationComponent implements OnInit {

    public config!: ActionConfiguration;
    public actionGroups: { name: string, options: ActionConfiguration[] }[] = [];

    @Input('action') public action!: ActionState;

    public get SelectedActionType(): string {
        return this.action.type;
    }

    public set SelectedActionType(type: string) {
        this.action.type = type;
        this.loadActionType();
    }

    public ngOnInit(): void {
        for (const action of actionList) {
            const name = action.group ?? '';

            let index = this.actionGroups.findIndex(x => x.name === name);
            if (index < 0) {
                index = this.actionGroups.length;
                this.actionGroups.push({ name, options: [] });
            }

            const options = this.actionGroups[index].options;
            options.push(action);
        }

        this.loadActionType();
    }

    public loadActionType(): void {
        this.action.inputs = [];

        this.config = actionList.find(x => x.type === this.action.type)!;
    }
}
