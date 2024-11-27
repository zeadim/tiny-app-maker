import { ExpressionNode } from "../../state/parser";
import { App } from "./app";

export class ReactiveExpression {
    public expression: ExpressionNode;
    public changedVariables = new Set<string>();

    public constructor(expression: ExpressionNode) {
        this.expression = expression;
    }

    public evaluate(app: App): any {
        const [result, changedVariables] = app.evaluateExpression(this.expression);
        this.changedVariables = changedVariables;
        return result;
    }
}
