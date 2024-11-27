import { getOperatorPrecedence, isBinaryOperator, isUnaryOperator, Location, throwError } from "./common";
import { Token } from "./tokenizer";

export interface NothingNode {
    type: "nothing";
    location: Location;
}

export interface VariableNode {
    type: "variable";
    location: Location;
    name: string;
}

export interface StringNode {
    type: "string";
    location: Location;
    value: string;
}

export interface NumberNode {
    type: "number";
    location: Location;
    value: number;
}

export interface BooleanNode {
    type: "boolean";
    location: Location;
    value: boolean;
}

export interface UnaryNode {
    type: "unary";
    location: Location;
    operator: string;
    value: ExpressionNode;
}

export interface BinaryNode {
    type: "binary";
    location: Location;
    operator: string;
    left: ExpressionNode;
    right: ExpressionNode;
}

export type ExpressionNode =
    | NothingNode
    | VariableNode
    | StringNode
    | NumberNode
    | BooleanNode
    | UnaryNode
    | BinaryNode;

export interface ActionNode {
    type: "action";
    location: Location;
    name: string;
    configuration?: ConfigurationNode,
}

export interface LocalEventNode {
    type: "local-event";
    location: Location;
    name: string;
    actions: ActionNode[];
}

export interface SettingNode {
    type: "setting";
    location: Location;
    name: string;
    expression: string;
}

export interface ConfigurationNode {
    type: "configuration";
    location: Location;
    settings: SettingNode[];
    events: LocalEventNode[];
}

export interface GlobalEventNode {
    type: "global-event";
    location: Location;
    name: string;
    configuration?: ConfigurationNode;
}

export interface ComponentNode {
    type: "component";
    location: Location;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    configuration?: ConfigurationNode;
}

export interface GlobalSettingsNode {
    type: "global-settings",
    location: Location,
    width: number,
    height: number,
    configuration?: ConfigurationNode,
}

export interface ProgramNode {
    type: "program",
    location: Location,
    settings?: GlobalSettingsNode,
    components: ComponentNode[];
    globalEvents: GlobalEventNode[];
}

export class Parser {
    code: string[];
    lines: string[][];
    tokens: Token[];
    tokenIndex: number;

    constructor(code: string, tokens: Token[]) {
        this.code = Array.from(code);
        this.lines = code.split('\n').map(x => Array.from(x));
        this.tokens = tokens;
        this.tokenIndex = 0;
    }

    peek(): Token | null {
        if (this.tokenIndex < this.tokens.length) {
            return this.tokens[this.tokenIndex];
        }
        return null;
    }

    proceed(): Token | null {
        const token = this.peek();
        this.tokenIndex += 1;
        return token;
    }

    proceedWithType(type: string, message?: string): Token {
        const token = this.assertNextTokenExists(message ?? `'${type}'`);
        if (token.type !== type) {
            throwError(token.location, `expected ${message ?? `'${type}'`}`);
        }
        this.proceed();
        return token;
    }

    assertNextTokenExists(message: string): Token {
        const token = this.peek();
        if (token === null) {
            const lastToken = this.tokens[this.tokenIndex - 1];
            const location = {
                line: lastToken.location.line,
                column: lastToken.location.column + lastToken.value.length
            };
            throwError(location, `expected ${message}`);
        }
        return token;
    }

    parseProgram(): ProgramNode {
        const location = this.peek()?.location ?? { line: 1, column: 1 };
        let settings: GlobalSettingsNode | undefined = undefined;
        const components = [] as ComponentNode[];
        const globalEvents = [] as GlobalEventNode[];
        while (true) {
            const token = this.peek();
            if (token === null) {
                break;
            }
            if (token.type === "settings") {
                settings = this.parseGlobalSettings();
            } else if (token.type === "on") {
                const globalEvent = this.parseGlobalEvent();
                globalEvents.push(globalEvent);
            } else if (token.type === "identifier") {
                const component = this.parseComponent();
                components.push(component);
            } else {
                throwError(token.location, `unexpected token: '${token.value}'`);
            }
        }
        return {
            type: "program",
            location,
            settings,
            components,
            globalEvents,
        }
    }

    parseGlobalSettings(): GlobalSettingsNode {
        const { location } = this.proceedWithType("settings");
        this.proceedWithType('(');
        const { value: width } = this.parseNumber();
        this.proceedWithType(',');
        const { value: height } = this.parseNumber();
        this.proceedWithType(')');
        const configuration = this.parseConfiguration(false);
        return {
            type: "global-settings",
            location,
            width,
            height,
            configuration,
        };
    }

    parseGlobalEvent(): GlobalEventNode {
        const { location } = this.proceedWithType("on");
        const name = this.proceedWithType("identifier", "global event name").value;
        const configuration = this.parseConfiguration(true);
        return {
            type: "global-event",
            location,
            name,
            configuration,
        };
    }

    parseComponent(): ComponentNode {
        const { location, value: name } = this.proceedWithType("identifier", "component name");
        this.proceedWithType('(');
        const { value: x } = this.parseNumber();
        this.proceedWithType(',');
        const { value: y } = this.parseNumber();
        this.proceedWithType(',');
        const { value: width } = this.parseNumber();
        this.proceedWithType(',');
        const { value: height } = this.parseNumber();
        this.proceedWithType(')');
        const configuration = this.parseConfiguration(true);
        return {
            type: "component",
            location,
            name,
            x,
            y,
            width,
            height,
            configuration,
        };
    }

    parseConfiguration(allowLocalEvents: boolean): ConfigurationNode | undefined {
        if (this.peek()?.type !== "{")
            return undefined;
        const { location } = this.proceedWithType("{");
        const settings = [] as SettingNode[];
        const events = [] as LocalEventNode[];
        while (true) {
            const token = this.assertNextTokenExists("'}'");
            if (token.type === "}") {
                this.proceed();
                break;
            }
            if (token.type === "on") {
                if (!allowLocalEvents)
                    throwError(token.location, "unexpected 'on'");
                const event = this.parseLocalEvent();
                events.push(event);
            } else {
                const setting = this.parseSetting();
                settings.push(setting);
            }
        }
        return {
            type: "configuration",
            location,
            settings,
            events,
        };
    }

    getCodeCharacterIndex(location: Location): number {
        let index = 0;
        for (let i = 0; i < location.line - 1; i++) {
            index += this.lines[i].length + 1;
        }
        index += location.column - 1;
        return index;
    }

    parseSetting(): SettingNode {
        const { location, value: name } = this.proceedWithType("identifier", "setting name");
        const semicolon = this.proceedWithType(":");
        this.parseExpression();
        const nextToken = this.peek();

        const from = this.getCodeCharacterIndex(semicolon.location) + 1;
        const to = nextToken ? this.getCodeCharacterIndex(nextToken.location) : this.code.length;
        let expression = this.code.slice(from, to).join("").trim();

        while (expression.endsWith('.')) { // TODO: do we want this?
            expression = expression.slice(0, -1);
        }

        return {
            type: "setting",
            location,
            name,
            expression,
        };
    }

    parseLocalEvent(): LocalEventNode {
        const { location } = this.proceedWithType("on");
        const name = this.proceedWithType("identifier", "event name").value;
        this.proceedWithType("{");
        const actions = [] as ActionNode[];
        while (true) {
            const token = this.assertNextTokenExists("'}'");
            if (token.type === "}") {
                this.proceed();
                break;
            }
            const action = this.parseAction();
            actions.push(action);
        }
        return {
            type: "local-event",
            location,
            name,
            actions,
        };
    }

    parseAction(): ActionNode {
        const { location, value: name } = this.proceedWithType("identifier", "action name");
        const configuration = this.parseConfiguration(false);
        return {
            type: "action",
            location,
            name,
            configuration,
        };
    }

    parseExpression(precedence: number = 0): ExpressionNode {
        let expression = this.parseAtom();
        while (true) {
            const token = this.peek();
            if (token === null || !isBinaryOperator(token.type)) {
                return expression;
            }
            const operatorPrecedence = getOperatorPrecedence(token.value);
            if (operatorPrecedence < precedence) {
                break;
            }
            this.proceed();
            const right = this.parseExpression(operatorPrecedence + 1);
            expression = {
                type: "binary",
                location: token.location,
                operator: token.value,
                left: expression,
                right
            }
        }
        return expression;
    }
    
    parseAtom(): ExpressionNode {
        const token = this.assertNextTokenExists("expression");
        if (token.type === "nothing") {
            return this.parseNothing();
        } else if (token.type === "identifier") {
            return this.parseVariable();
        } else if (token.type === "string") {
            return this.parseString();
        } else if (token.type === "number") {
            return this.parseNumber();
        } else if (token.type === "boolean") { 
            return this.parseBoolean();
        } else if (isUnaryOperator(token.value)) {
            return this.parseUnary();
        } else if (token.type === "(") {
            this.proceedWithType("(");
            const expression = this.parseExpression();
            this.proceedWithType(")");
            return expression;
        }
        throwError(token.location, `unexpected '${token.value}', expected expression`);
    }
    
    parseUnary(): UnaryNode {
        const token = this.assertNextTokenExists("unary operator");
        if (!isUnaryOperator(token.value)) {
            throwError(token.location, "expected unary operator");
        }
        this.proceed();
        const value = this.parseAtom();
        return {
            type: "unary",
            location: token.location,
            operator: token.value,
            value
        };
    }
    
    parseNothing(): NothingNode {
        const { location } = this.proceedWithType("_", "nothing ('_')");
        return {
            type: "nothing",
            location,
        };
    }

    parseVariable(): VariableNode {
        const { location, value: name } = this.proceedWithType("identifier", "a variable");
        return {
            type: "variable",
            location,
            name: name.toUpperCase(),
        };
    }

    parseString(): StringNode {
        const { location, value } = this.proceedWithType("string", "a string");
        return {
            type: "string",
            location,
            value,
        };
    }
    
    parseNumber(): NumberNode {
        const { location, value } = this.proceedWithType("number", "a number");
        return {
            type: "number",
            location,
            value: parseFloat(value),
        };
    }
    
    parseBoolean(): BooleanNode {
        const { location, value } = this.proceedWithType("boolean", "a boolean");
        return {
            type: "boolean",
            location,
            value: value === "true",
        };
    }
}
