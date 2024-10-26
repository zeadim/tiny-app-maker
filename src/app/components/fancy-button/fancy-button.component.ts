import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-fancy-button',
    templateUrl: './fancy-button.component.html',
    styleUrls: ['./fancy-button.component.scss']
})
export class FancyButtonComponent {

    @Input('icon') public icon: string = '';
    @Input('label') public label: string = '';
    @Input('color') public color: string = '#eee';
    @Input('disabled') public disabled: boolean = false;

    @Output('onClick') public onClick: EventEmitter<void> = new EventEmitter();

    public handleClick(event: PointerEvent): void {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (!this.disabled)
            this.onClick.emit();
    }
}
