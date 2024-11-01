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
    public currentConstantValue?: any;
    public currentVariableValue?: string;

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
        this.input.value = value;

        if (this.Variable) {
            this.currentVariableValue = this.input.value;
        } else {
            this.currentConstantValue = this.input.value;

            //if (this.config.type === 'string')
            //    this.currentVariableValue = this.input.value;
        }

        if (this.IsOutput) // TODO: debounce?
            this.stateService.updateVariables();
    }

    public get Variable(): boolean {
        return this.IsOutput || this.input.variable;
    }

    public set Variable(value: boolean) {
        if (this.IsOutput)
            return;

        this.input.variable = value;

        if (this.input.variable)
            this.input.value = this.currentVariableValue;
        else
            this.input.value = this.currentConstantValue;
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
        this.Value = this.input.value; // initialize state
    }

    public ngOnDestroy(): void {
        // Uncommented, because not entirely correct - e.g. for booleans, if false but defaultValue is true, then incorrect behavior
        // Would probably need to use defaultValue from config when initial value set in app (but currently config not copied)

        /*
        // Remove inputs from state object where value is the same as the value that will be used in app anyways

        if (this.Variable && typeof this.input.value === 'string' && this.input.value !== '')
            return;

        if (this.config.type === 'boolean' && this.input.value !== (this.config.defaultValue ?? false))
            return;

        if (this.config.type === 'string' && typeof this.input.value === 'string' && this.input.value !== (this.config.defaultValue ?? ''))
            return;

        if (this.config.type === 'number' && typeof this.input.value === 'number' && this.input.value !== (this.config.defaultValue ?? 0))
            return;

        if (this.config.type === 'color' || this.config.type === 'datetime' || this.config.type === 'options')
            return;

        const index = this.inputs.indexOf(this.input);
        this.inputs.splice(index, 1);*/
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
