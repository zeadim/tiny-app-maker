import { Component, Input, OnInit } from '@angular/core';
import { ComponentState, InputState } from 'src/app/types/state';
import { InputConfiguration } from 'src/config/types';

@Component({
  selector: 'app-configuration-input',
  templateUrl: './configuration-input.component.html',
  styleUrls: ['./configuration-input.component.scss']
})
export class ConfigurationInputComponent implements OnInit {

    public input?: InputState;

    @Input('config') public config!: InputConfiguration;
    @Input('component') public component!: { inputs: InputState[] };

    public get Value(): any {
        return this.input?.value;
    }

    public set Value(value: any) {
        (!this.input)
            this.addInput();

        this.input!.value = value;
    }

    public ngOnInit(): void {
        this.input = this.component.inputs.find(x => x.name == this.config.name);
    }

    private addInput(): void {
        this.input = {
            name: this.config.name,
            value: undefined,
            variable: false,
        };

        this.component.inputs.push(this.input);
    }
}
