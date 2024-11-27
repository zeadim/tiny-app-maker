import { BinaryNode, ExpressionNode, UnaryNode } from "./parser";

export class Evaluator {
    private variables: Map<string, any>;
    public queries = new Set<string>();

    public constructor(variables: Map<string, any>) {
        this.variables = variables;
    }

    public evaluateExpression(node: ExpressionNode): any {
        switch (node.type) {
            case 'nothing':
                return undefined;

            case 'string':
                return node.value;

            case 'number':
                return node.value;

            case 'boolean':
                return node.value;

            case 'variable':
                this.queries.add(node.name);
                //console.log('GETVAR', node.name, this.variables.get(node.name), this.variables);
                return this.variables.get(node.name);

            case 'unary':
                return this.evaluateUnary(node);

            case 'binary':
                return this.evaluateBinary(node);
        }
    }

    public evaluateUnary(node: UnaryNode): any {
        const value = () => this.evaluateExpression(node.value);

        if (node.operator === '+') {
            return +value();
        }

        if (node.operator === '-') {
            return -value();
        }

        if (node.operator === '!') {
            return !value();
        }

        return undefined;
    }

    public evaluateBinary(node: BinaryNode): any {
        const left = () => this.evaluateExpression(node.left);
        const right = () => this.evaluateExpression(node.right);

        if (node.operator === '|' || node.operator === ";") {
            return left() || right();
        }

        if (node.operator === "&") {
            return left() && right();
        }

        if (node.operator === "=") {
            return left() === right();
        }

        if (node.operator === "!=") {
            return left() !== right();
        }

        if (node.operator === "<") {
            return left() < right();
        }

        if (node.operator === ">") {
            return left() > right();
        }

        if (node.operator === "<=") {
            return left() <= right();
        }

        if (node.operator === ">=") {
            return left() >= right();
        }

        if (node.operator === "+") {
            return left() + right();
        }

        if (node.operator === "-") {
            return left() - right();
        }

        if (node.operator === "*" || node.operator === "×") {
            return left() * right();
        }

        if (node.operator === "/") {
            return left() / right();
        }

        if (node.operator === "%") {
            return left() % right();
        }

        if (node.operator === "^") {
            return left() ** right();
        }

        return undefined;
    }
}
