import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActionState } from '../../types/state';
import { ActionConfiguration, InputConfiguration } from '../../../config/types';
import { actionList } from '../../../config/action-list';
import { Subscription } from 'rxjs';
import { EditorService } from 'src/app/services/editor.service';

@Component({
    selector: 'app-action-configuration',
    templateUrl: './action-configuration.component.html',
    styleUrls: ['./action-configuration.component.scss']
})
export class ActionConfigurationComponent implements OnInit, OnDestroy {

    public config!: ActionConfiguration;
    public action!: ActionState;
    public actionGroups: { name: string, options: ActionConfiguration[] }[] = [];
    public savedActionStates: Map<string, ActionState> = new Map();
    public configInputs: InputConfiguration[] = [];
    public subscription: Subscription = new Subscription();

    @Input('action')
    public set Action(action: ActionState) {
        this.action = action;
        this.savedActionStates.clear();
        this.loadActionType();
    }

    public get SelectedActionType(): string {
        return this.action.name;
    }

    public set SelectedActionType(type: string) {
        this.savedActionStates.set(this.action.name, { ...this.action });

        this.action.name = type;

        const action = this.savedActionStates.get(type);
        this.action.inputs = action?.inputs ?? [];

        this.loadActionType();
    }

    public constructor(
        public readonly editorService: EditorService,
    ) {
        //
    }

    public ngOnInit(): void {
        this.subscription.add(this.editorService.paste$.subscribe(() => {
            const clipboardState = this.editorService.getClipboardState();
            if (!clipboardState?.action)
                return;

            // setTimeout to make sure paste logic in event-configuration is executed first
            setTimeout(() => this.loadActionType());
        }));

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

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public loadActionType(): void {
        this.config = actionList.find(x => x.name === this.action.name)!;

        // Copy input objects to let Angular detect difference in ngFor items
        // when switching between two actions of the same type (i.e. with same config)
        this.configInputs = this.config.inputs.map(x => ({ ...x }));
    }
}
