import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { componentList } from '../../../config/component-list';
import { ComponentConfiguration } from 'src/config/types';
import { ComponentState } from 'src/app/types/state';

@Component({
  selector: 'app-edit-component-overlay',
  templateUrl: './edit-component-overlay.component.html',
  styleUrls: ['./edit-component-overlay.component.scss']
})
export class EditComponentOverlayComponent implements OnInit, AfterViewInit {

    public componentGroups: { name: string, options: ComponentConfiguration[] }[] = [];
    public componentTypeLoaded: boolean = false;

    @Input('component') public component!: ComponentState;

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();
    
    @ViewChild('dialog') public dialog!: ElementRef<HTMLDialogElement>;

    public get SelectedComponentType(): string {
        return this.component.type;
    }

    public set SelectedComponentType(type: string) {
        this.component.type = type;

        this.component.inputs = [];
        this.component.outputs = [];
        this.component.events = [];

        this.componentTypeLoaded = false;
        setTimeout(() => this.componentTypeLoaded = true);
    }

    public ngOnInit(): void {
        for (const component of componentList) {
            const name = component.group ?? '';

            let index = this.componentGroups.findIndex(x => x.name === name);
            if (index < 0) {
                index = this.componentGroups.length;
                this.componentGroups.push({ name, options: [] });
            }
            
            const options = this.componentGroups[index].options;
            options.push(component);
        }

        this.componentTypeLoaded = true;
    }

    public ngAfterViewInit(): void {
      this.dialog.nativeElement.showModal();
    }

    public closeModal(): void {
        this.onClose.emit();
    }
}
