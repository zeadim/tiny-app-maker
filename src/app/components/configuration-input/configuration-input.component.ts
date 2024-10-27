import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InputState } from '../../types/state';
import { InputConfiguration } from '../../../config/types';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-configuration-input',
    templateUrl: './configuration-input.component.html',
    styleUrls: ['./configuration-input.component.scss']
})
export class ConfigurationInputComponent implements OnInit, OnDestroy {

    public input!: InputState;
    public id: string = '';
    public variableOptions: string[] = [];

    @Input('config') public config!: InputConfiguration;
    @Input('inputs') public inputs!: InputState[];

    public get IsOutput(): boolean {
        return this.config.type === 'variable';
    }

    public get VariableOptions(): string[] {
        return this.stateService.getVariables();
    }

    public get Value(): any {
        return this.input.value;
    }

    public set Value(value: any) {
        this.input.value = this.Variable ? value?.toUpperCase() : value;

        if (this.IsOutput)
            this.stateService.updateVariables();
    }

    public get Variable(): boolean {
        return this.IsOutput || this.input.variable;
    }

    public set Variable(value: boolean) {
        if (this.IsOutput)
            return;

        this.input.value = this.config.type === 'string' ? this.input.value?.toUpperCase() : undefined;
        this.input.variable = value;
    }

    public constructor(
        public readonly stateService: StateService,
    ) {
        //
    }

    public ngOnInit(): void {
        let input = this.inputs.find(x => x.name == this.config.name);
        if (!input)
            input = this.addInput();

        this.input = input;
        this.id = `id--${this.config.name.replaceAll(' ', '-')}`;
    }

    public ngOnDestroy(): void {
        if (this.Variable && typeof this.input.value === 'string' && this.input.value != '')
            return;

        if (this.config.type === 'boolean' && this.input.value)
            return;

        if (this.config.type === 'string' && typeof this.input.value === 'string' && this.input.value !== '')
            return;

        if (this.config.type === 'number' && typeof this.input.value === 'number' && this.input.value !== 0)
            return;

        if (this.config.type === 'color')// && typeof this.input.value === 'string' && this.input.value !== '#000')
            return;

        const index = this.inputs.indexOf(this.input);
        this.inputs.splice(index, 1);
    }

    public onVariableChange(event: Event): void {
        // @ts-ignore - needed to keep checkbox checked for forced variables
        event.target.checked = this.Variable;
    }

    private addInput(): InputState {
        this.input = {
            name: this.config.name,
            value: this.config.defaultValue,
            variable: this.config.defaultVariable ?? false,
        };

        this.inputs.push(this.input);
        return this.input;
    }
}
