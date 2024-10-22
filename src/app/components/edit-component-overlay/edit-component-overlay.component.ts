import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { componentList } from '../../../config/component-list';
import { ComponentConfiguration } from 'src/config/types';

@Component({
  selector: 'app-edit-component-overlay',
  templateUrl: './edit-component-overlay.component.html',
  styleUrls: ['./edit-component-overlay.component.scss']
})
export class EditComponentOverlayComponent implements OnInit, AfterViewInit {

    private selectedComponentType = componentList[0].type;
    public componentGroups: { name: string, options: ComponentConfiguration[] }[] = [];

    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();
    
    @ViewChild('dialog') public dialog!: ElementRef<HTMLDialogElement>;

    public get SelectedComponentType(): string {
        return this.selectedComponentType;
    }

    public set SelectedComponentType(type: string) {
        this.selectedComponentType = type;
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
    }

    public ngAfterViewInit(): void {
      this.dialog.nativeElement.showModal();
    }

    public closeModal(): void {
        this.onClose.emit();
    }
}
