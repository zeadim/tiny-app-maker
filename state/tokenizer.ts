import {
    isBoolean,
    isDigit,
    isIdentifierCharacter,
    isIdentifierInitialCharacter,
    isKeyword,
    isNothing,
    isOperator,
    isOperatorCharacter,
    isPunctuationCharacter,
    isStringContainerCharacter,
    isWhitespace,
    Location,
    throwError
} from "./common"

export interface Token {
    location: Location;
    value: string;
    type: string;
}

export class Tokenizer {
    characters: string[];
    characterIndex: number;
    currentLocation: Location;
    lastTokenLocation: Location | null;
    tokenizeEverything: boolean;

    constructor(code: string, tokenizeEverything = false) {
        this.characters = Array.from(code);
        this.characterIndex = 0;
        this.currentLocation = { line: 1, column: 1 };
        this.lastTokenLocation = null;
        this.tokenizeEverything = tokenizeEverything;
    }

    tokenizeCode(): Token[] {
        const tokens = [] as Token[];
        while (true) {
            const token = this.getNextToken();
            if (token === null) {
                break;
            }
            tokens.push(token);
        }
        return tokens;
    }

    getNextToken(): Token | null {
        let c: string = "";
        while (true) {
            const whitespace = this.skipWhitespace();
            if (whitespace.length > 0 && this.tokenizeEverything) {
                return this.createToken(whitespace, "whitespace");
            }
            c = this.peek();
            if (c === "") {
                return null;
            }
            if (c === ".") { // TODO: "." is a delimiter - added because code-in-URL pasting removes newlines
                this.proceed();
            } else {
                break;
            }
        }
        if (isNothing(c)) {
            return this.tokenizeNothing();
        } else if (isStringContainerCharacter(c)) {
            return this.tokenizeString();
        } else if (isDigit(c)) {
            return this.tokenizeNumber();
        } else if (isIdentifierInitialCharacter(c)) {
            return this.tokenizeIdentifier();
        } else if (isOperatorCharacter(c)) {
            return this.tokenizeOperator();
        } else if (isPunctuationCharacter(c)) {
            return this.tokenizePunctuation();
        }
        throwError(this.currentLocation, `unexpected character: ${c}`);
    }

    createToken(value: string, type: string) {
        const location = this.lastTokenLocation || { ...this.currentLocation };
        this.lastTokenLocation = null;
        return { location, value, type };
    }

    peek(steps: number = 0): string {
        const i = this.characterIndex + steps;
        return i < this.characters.length ? this.characters[i] : "";
    }

    proceed(): string {
        const c = this.peek();
        if (c === "\n") {
            this.currentLocation.line += 1;
            this.currentLocation.column = 1;
        } else {
            this.currentLocation.column += 1;
        }
        this.characterIndex += 1;
        return c;
    }

    mark(): void {
        this.lastTokenLocation = { ...this.currentLocation };
    }

    readCharacters(predicate: (c: string) => boolean): string {
        let s = "";
        while (true) {
            const c = this.peek();
            if (c === "" || !predicate(c)) {
                break;
            }
            s += c;
            this.proceed();
        }
        return s;
    }

    skipWhitespace(): string {
        return this.readCharacters(isWhitespace);
    }

    tokenizeNothing(): Token {
        this.mark();
        this.proceed();
        return this.createToken("_", "nothing");
    }

    tokenizeString(): Token {
        this.mark();
        let s = "";
        const q = this.proceed();
        while (true) {
            const c = this.peek();
            if (c === "") {
                break;
            }
            if (c === q) {
                break;
            }
            // TODO: handle special characters (\n, \t, \\, ...)
            s += c;
            this.proceed();
        }
        this.proceed();
        return this.createToken(s, "string");
    }

    tokenizeNumber(): Token {
        this.mark();
        let s = "";
        let encounteredDot = false;
        while (true) {
            const c = this.peek();
            if (c === "") {
                break;
            }
            if (c === ".") {
                if (encounteredDot) {
                    break;
                }
                encounteredDot = true;
            } else if (!isDigit(c)) {
                break;
            }
            s += c;
            this.proceed();
        }
        if (s.endsWith(".")) {
            s += "0";
        }
        return this.createToken(s, "number");
    }

    tokenizeOperator(): Token {
        this.mark();
        const operator = this.readCharacters(isOperatorCharacter);
        if (!isOperator(operator)) {
            throwError(this.currentLocation, `invalid operator: ${operator}`);
        }
        return this.createToken(operator, operator);
    }

    tokenizeIdentifier(): Token {
        this.mark();

        // Allow spaces in identifiers
        let identifier = '';
        while (true) {
            identifier += this.readCharacters(isIdentifierCharacter);
            if (isKeyword(identifier) || this.peek() !== " ") {
                break;
            }
            identifier += this.readCharacters(c => c === " ");
            if (!isIdentifierInitialCharacter(this.peek())) {
                break;
            }
        }
        identifier = identifier.trim();

        let type = "identifier";
        if (isBoolean(identifier)) {
            type = "boolean";
        } else if (isNothing(identifier) || isKeyword(identifier) || isOperator(identifier)) {
            type = identifier;
        }
        return this.createToken(identifier, type);
    }

    tokenizePunctuation(): Token {
        this.mark();
        const punctuation = this.proceed();
        return this.createToken(punctuation, punctuation);
    }
}
