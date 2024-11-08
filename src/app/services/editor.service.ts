import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClipboardState } from '../types/clipboard-state';
import { ActionState, ComponentState, GlobalEventState } from '../types/state';
import { StateService } from './state.service';
import { ComponentConfiguration } from 'src/config/types';
import { globalEventList } from 'src/config/global-event-list';

@Injectable({
    providedIn: 'root'
})
export class EditorService {

    public clear$ = new Subject<void>();
    public paste$ = new Subject<void>();
    public copy$ = new Subject<void>();

    public componentList: ComponentConfiguration[] = [];

    private clipboardState?: ClipboardState;

    public constructor(
        public readonly stateService: StateService,
    ) {
        //
    }

    public getClipboardState(): ClipboardState | undefined {
        if (!this.clipboardState)
            return undefined;

        if (this.componentList === globalEventList) {
            return {
                component: this.clipboardState.globalEvent,
                action: this.clipboardState.action,
            };
        } else {
            return {
                component: this.clipboardState.component,
                action: this.clipboardState.action,
            };
        }
    }

    public setClipboardState(component: ComponentState, action?: ActionState): void {
        if (this.componentList === globalEventList) {
            this.clipboardState = {
                globalEvent: this.stateService.copyComponentState(component),
                action: action ? this.stateService.copyActionState(action) : undefined,
            };
        } else {
            this.clipboardState = {
                component: this.stateService.copyComponentState(component),
                action: action ? this.stateService.copyActionState(action) : undefined,
            };
        }
    }
}
