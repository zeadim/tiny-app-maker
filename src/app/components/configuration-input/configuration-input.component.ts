import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InputState } from '../../types/state';
import { InputConfiguration } from '../../../config/types';
import { StateService } from '../../services/state.service';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { EditorService } from 'src/app/services/editor.service';
import { Tokenizer } from 'state/tokenizer';

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
    public currentVariableValue: string = '';
    public subscription = new Subscription();

    public value: any;
    public variable: boolean = false;
    
    public updateVariables$: Subject<void> = new Subject();

    @Input('config') public config!: InputConfiguration;
    @Input('inputs') public inputs!: InputState[];

    public get IsOutput(): boolean {
        return this.config.type === 'variable';
    }

    public get VariableOptions(): string[] {
        return this.stateService.getVariables();
    }

    public get Value(): any {
        return this.value;
    }

    public set Value(value: any) {
        this.value = value;

        if (this.Variable) {
            this.currentVariableValue = this.value;
        } else {
            this.currentConstantValue = this.value;

            //if (this.config.type === 'string')
            //    this.currentVariableValue = this.input.value;
        }
        
        this.input.value = this.Variable ? value : this.convertValue(this.value);
        //console.log('value', this.value, '|', this.input.value, "|", this.isConstantValue(this.input.value));

        if (this.IsOutput)
            this.updateVariables$.next();
    }

    public get Variable(): boolean {
        return this.IsOutput || this.variable;
    }

    public set Variable(value: boolean) {
        if (this.IsOutput)
            return;

        this.variable = value;

        if (this.variable)
            this.value = this.currentVariableValue;
        else
            this.value = this.currentConstantValue;

        this.input.value = this.variable ? this.value : this.convertValue(this.value);
    }

    public constructor(
        public readonly stateService: StateService,
        public readonly editorService: EditorService,
    ) {
        //
    }

    public ngOnInit(): void {
        let input = this.inputs.find(x => x.name == this.config.name);
        if (!input)
            input = this.addInput();
        else
            this.variable = !this.isConstantValue(input.value);

        this.input = input;
        this.id = `id--${this.config.name.replaceAll(' ', '-')}`;
        this.Value = this.deconvertValue(this.input.value); // initialize state

        this.subscription.add(this.editorService.clear$.subscribe(() => {
            this.Variable = !!this.config.defaultVariable;
            this.Value = this.Variable ? '' : this.config.defaultValue;
        }));

        this.subscription.add(this.updateVariables$.pipe(debounceTime(500)).subscribe(() => {
            this.stateService.updateVariables();
        }));
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();

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
        this.value = this.config.defaultValue;
        this.variable = !!this.config.defaultVariable;

        this.input = {
            name: this.config.name,
            value: this.convertValue(this.config.defaultValue),
            variable: true, // this.config.defaultVariable ?? false,
        };

        this.inputs.push(this.input);
        return this.input;
    }

    private convertValue(value: any): string | undefined {
        if (value == null) {
            return undefined;
        }

        return value == null ? undefined : JSON.stringify(value);
    }

    private isConstantValue(value: string | undefined): boolean {
        if (value === undefined) {
            return true;
        }
        
        const tokenizer = new Tokenizer(value);
        const tokens = tokenizer.tokenizeCode();
        return tokens.length === 1 && ["string", "number", "boolean"].includes(tokens[0].type);
    }

    private deconvertValue(value: string | undefined): any {
        if (value === undefined) {
            return undefined;
        }

        return this.isConstantValue(value) ? JSON.parse(value) : value;
    }
}
