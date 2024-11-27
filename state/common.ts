export interface Location {
    line: number;
    column: number;
}

export function throwError(location: Location, message: string): never {
    throw { location, message };
}

// TODO: use switch cases instead of [].includes() for performance

export function isWhitespace(c: string): boolean {
    return ["\u00A0", " ", "\n", "\r", "\t"].includes(c);
}

export function isStringContainerCharacter(c: string): boolean {
    return ['"', "'"].includes(c);
}

export function isDigit(c: string): boolean {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(c);
}

export function isLetter(c: string): boolean {
    return [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    ].includes(c);
}

export function isIdentifierInitialCharacter(c: string): boolean {
    return isLetter(c);
}

export function isIdentifierCharacter(c: string): boolean {
    return isIdentifierInitialCharacter(c) || isDigit(c) || c === "-";
}

export function isOperatorCharacter(c: string): boolean {
    return ["!", "|", ";", "&", "+", "-", "*", "×", "/", "%", "=", "<", ">"].includes(c);
}

export function isPunctuationCharacter(c: string): boolean {
    return [",", ":", "(", ")", "{", "}"].includes(c);
}

export function isNothing(s: string): boolean {
    return ["_"].includes(s);
}

export function isBoolean(s: string): boolean {
    return ["true", "false"].includes(s);
}

export function isKeyword(s: string): boolean {
    return ["settings", "on"].includes(s);
}

export function getOperatorPrecedence(operator: string): number {
    return [
        ["|", ";"], ["&"],
        ["=", "!="], ["<", ">", "<=", ">="],
        ["+", "-"], ["*", "×","/", "%"], ["^"],
    ].findIndex(l => l.indexOf(operator) >= 0);
}

export function isUnaryOperator(s: string): boolean {
    return ["+", "-", "!"].includes(s);
}

export function isBinaryOperator(s: string): boolean {
    return [
        "|", ";", "&",
        "=", "!=", "<", ">", "<=", ">=",
        "+", "-", "*", "×", "/", "%", "^",
    ].includes(s);
}

export function isOperator(s: string): boolean {
    return isUnaryOperator(s) || isBinaryOperator(s);
}
