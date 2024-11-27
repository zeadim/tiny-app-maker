import { Evaluator } from "../../state/evaluator";
import { ExpressionNode, Parser } from "../../state/parser";
import { Tokenizer } from "../../state/tokenizer";
import { App } from "./app";
import { ReactiveExpression } from "./reactive-expression";
import { InputState } from "./types";

export class InputHolder {
    protected app: App;

    protected inputConstants = new Map<string, any>();
    protected inputVariables = new Map<string, string>();
    protected inputExpressions = new Map<string, ReactiveExpression>();

    public constructor(app: App, inputs: InputState[]) {
        this.app = app;

        for (const input of inputs) {
            if (input.value == null) // TODO: perhaps add undefined in map instead, and assert getInput()s use existing name?
                continue;

            const tokenizer = new Tokenizer(input.value);
            const tokens = tokenizer.tokenizeCode();
            const parser = new Parser(input.value, tokens);
            const expression = parser.parseExpression();

            if (tokens.length === 1 && ["string", "number", "boolean"].includes(tokens[0].type)) {
                const [value] = this.app.evaluateExpression(expression);
                this.inputConstants.set(input.name, value);
            } else {
                this.inputExpressions.set(input.name, new ReactiveExpression(expression));
            }

            /*if (!this.isConstantValue(input.value)) {
                this.inputVariables.set(input.name, input.value);
            } else {
                this.inputConstants.set(input.name, input.value);
            }*/
        }
    }

    public getInput(name: string): any {
        if (this.inputConstants.has(name))
            return this.inputConstants.get(name);

        if (this.inputVariables.has(name)) {
            const variable = this.inputVariables.get(name) ?? '';
            return this.app.getVariableValue(variable);
        }

        if (this.inputExpressions.has(name)) {
            const expression = this.inputExpressions.get(name)!;
            const a = expression.evaluate(this.app);
            return a;
        }

        return undefined;
    }

    public getInputVariable(name: string): string {
        if (!this.inputExpressions.has(name))
            return '';

        const { expression } = this.inputExpressions.get(name)!;
        return expression.type === "variable" ? expression.name : '';
    }

    public getInputBoolean(name: string): boolean {
        return App.parseBoolean(this.getInput(name)) ?? false;
    }

    public getInputString(name: string): string {
        return App.parseString(this.getInput(name)) ?? '';
    }

    public getInputNumber(name: string): number {
        return App.parseNumber(this.getInput(name)) ?? 0;
    }
}