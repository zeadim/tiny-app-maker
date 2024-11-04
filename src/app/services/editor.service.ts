import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClipboardState } from '../types/clipboard-state';
import { ActionState, ComponentState } from 'app-template/src/types';
import { StateService } from './state.service';
import { ComponentConfiguration } from 'src/config/types';

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
        return this.clipboardState;
    }

    public setClipboardState(component: ComponentState, action?: ActionState): void {
        this.clipboardState = {
            component: this.stateService.copyComponent(component),
            action: action ? this.stateService.copyAction(action) : undefined,
        };
    }
}
