import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {

    public subscription: Subscription = new Subscription();

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('dialog') public dialog!: ElementRef<HTMLDialogElement>;

    public constructor(
        public ngZone: NgZone,
    ) {
        //
    }

    public ngOnInit(): void {
        console.log('opened');
        this.ngZone.runOutsideAngular(() => {
            this.subscription = fromEvent<KeyboardEvent>(window, 'keydown').subscribe((event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    this.ngZone.run(() => this.closeModal());
                }
            });
        });
    }

    public ngAfterViewInit(): void {
      this.dialog.nativeElement.showModal();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public closeModal(): void {
        this.onClose.emit();
    }
}
