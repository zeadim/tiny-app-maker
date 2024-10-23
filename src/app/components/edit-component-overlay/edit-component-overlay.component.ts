import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { componentList } from '../../../config/component-list';
import { ComponentConfiguration } from 'src/config/types';
import { ComponentState } from 'src/app/types/state';

@Component({
    selector: 'app-edit-component-overlay',
    templateUrl: './edit-component-overlay.component.html',
    styleUrls: ['./edit-component-overlay.component.scss']
})
export class EditComponentOverlayComponent implements AfterViewInit {

    @Input('component') public component!: ComponentState;

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();

    @ViewChild('dialog') public dialog!: ElementRef<HTMLDialogElement>;

    public ngAfterViewInit(): void {
        this.dialog.nativeElement.showModal();
    }

    public closeModal(): void {
        this.onClose.emit();
    }
}
