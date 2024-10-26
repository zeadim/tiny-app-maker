import { Component, Input, OnInit } from '@angular/core';
import { ActionState } from '../../types/state';
import { ActionConfiguration, InputConfiguration } from '../../../config/types';
import { actionList } from '../../../config/action-list';

@Component({
    selector: 'app-action-configuration',
    templateUrl: './action-configuration.component.html',
    styleUrls: ['./action-configuration.component.scss']
})
export class ActionConfigurationComponent implements OnInit {

    public config!: ActionConfiguration;
    public action!: ActionState;
    public actionGroups: { name: string, options: ActionConfiguration[] }[] = [];
    public savedActionStates: Map<string, ActionState> = new Map();
    public configInputs: InputConfiguration[] = [];

    @Input('action')
    public set Action(action: ActionState) {
        this.action = action;
        this.savedActionStates.clear();
        this.loadActionType();
    }

    public get SelectedActionType(): string {
        return this.action.type;
    }

    public set SelectedActionType(type: string) {
        this.savedActionStates.set(this.action.type, { ...this.action });

        this.action.type = type;

        const action = this.savedActionStates.get(type);
        this.action.inputs = action?.inputs ?? [];

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
        this.config = actionList.find(x => x.type === this.action.type)!;

        // Copy input objects to let Angular detect difference in ngFor items
        // when switching between two actions of the same type (i.e. with same config)
        this.configInputs = this.config.inputs.map(x => ({ ...x }));
    }
}
