import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-fancy-button',
    templateUrl: './fancy-button.component.html',
    styleUrls: ['./fancy-button.component.scss']
})
export class FancyButtonComponent {

    @Input('icon') public icon: string = '';
    @Input('label') public label: string = '';

    @Output('onClick') public onClick: EventEmitter<void> = new EventEmitter();

    public handleClick(event: PointerEvent): void {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.onClick.emit();
    }
}
