import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-component-overlay',
  templateUrl: './edit-component-overlay.component.html',
  styleUrls: ['./edit-component-overlay.component.scss']
})
export class EditComponentOverlayComponent implements AfterViewInit {

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();
    
    @ViewChild('dialog') public dialog!: ElementRef<HTMLDialogElement>;

    public ngAfterViewInit(): void {
      this.dialog.nativeElement.showModal();
    }

    public closeModal(): void {
        this.onClose.emit();
    }
}
