import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputState } from 'app-template/src/types';
import { settingsList } from '../../../config/settings-list';
import { InputConfiguration } from '../../../config/types';

@Component({
  selector: 'app-edit-settings-overlay',
  templateUrl: './edit-settings-overlay.component.html',
  styleUrls: ['./edit-settings-overlay.component.scss']
})
export class EditSettingsOverlayComponent implements OnInit {

    public configInputs: InputConfiguration[] = [];
    
    @Input('settings') public settings: InputState[] = [];
    
    @Output('onClose') public onClose: EventEmitter<void> = new EventEmitter();

    public ngOnInit(): void {
        this.configInputs = settingsList;
    }

    public closeModal(): void {
        this.onClose.emit();
    }
}
