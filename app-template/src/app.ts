import { ExpressionNode } from "../../state/parser";
import { Component } from "./components/component";
import { Addressable, AddressableType } from "./types";
import { Evaluator } from "../../state/evaluator";

// TODO:
// - instead of passing app instance through classes, make it global/static
// - move static methods here to common.ts file

export class App extends EventTarget {
    private gridElement: HTMLElement;
    private variables: Map<string, any> = new Map();
    private addressables: Map<string, Addressable> = new Map();
    private functionListeners: Map<string, (() => unknown)[]> = new Map();

    public audioContext: AudioContext;

    public constructor(gridElement: HTMLElement) {
        super();
        this.gridElement = gridElement;

        this.audioContext = new AudioContext();
    }

    public addComponent(component: Component): void {
        this.gridElement.appendChild(component.htmlElement);
    }

    public getVariableValue(variable: string): unknown {
        return variable ? this.variables.get(variable) : undefined;
    }

    public setVariableValue(variable: string, value: any): void {
        if (!variable)
            return;

        this.variables.set(variable, value);
        const event = new CustomEvent('update', { detail: { variable, value } });
        this.dispatchEvent(event);
    }

    public getAddressable(id: string | undefined): Addressable | undefined {
        return id ? this.addressables.get(id) : undefined;
    }

    public getAddressableObject<T>(id: string | undefined, expectedType: AddressableType): T | undefined {
        const addressable = this.getAddressable(id);
        if (!addressable || addressable.type !== expectedType)
            return undefined;

        return addressable.object as T;
    }

    public getAllAddressables(type?: AddressableType): Addressable[] {
        let list = Array.from(this.addressables.values());
        
        if (type)
            list = list.filter(x => x.type === type);

        return list;
    }

    public createAddressable(type: AddressableType, object: any): Addressable {
        const id = `id:${type}/${App.generateUniqueId()}`;
        const addressable = { id, type, object };

        this.addressables.set(id, addressable);

        return addressable;
    }

    public removeAddressable(id: string | undefined): void {
        if (!id)
            return;

        this.addressables.delete(id);
    }

    public addFunctionListener(functionName: string, listener: () => unknown): void {
        if (!this.functionListeners.has(functionName))
            this.functionListeners.set(functionName, []);

        const listeners = this.functionListeners.get(functionName);
        listeners?.push(listener);
    }
    
    public removeFunctionListener(functionName: string, listener: () => unknown): void {
        if (!this.functionListeners.has(functionName))
            return;

        const listeners = this.functionListeners.get(functionName);
        const index = listeners!.indexOf(listener) ?? -1;
        if (index < 0)
            return;

        listeners!.splice(index, 1);
        if (listeners!.length === 0)
            this.functionListeners.delete(functionName);
    }

    public async invokeFunction(functionName: string): Promise<void> {
        if (!this.functionListeners.has(functionName))
            return;

        const listeners = this.functionListeners.get(functionName)!.slice();
        for (const listener of listeners) {
            await listener();
        }
    }

    public static generateUniqueId(): string {
        // TODO: use proper UUID algorithm
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let s = '';
        for (let i = 0; i < 6; i++) {
            const i = Math.floor(Math.random() * chars.length);
            s += chars[i];
        }
        return s;
    }

    public static parseBoolean(value: any): boolean | undefined {
        if (value === undefined)
            return undefined;

        return !!value;
    }

    public static parseString(value: any): string | undefined {
        if (value === undefined)
            return undefined;

        return value == null ? '' : `${value}`;
    }

    public static parseNumber(value: any): number | undefined {
        if (value === undefined)
            return undefined;

        const number = +value;

        if (Number.isNaN(number))
            return 0;

        if (!Number.isFinite(number))
            return number > 0 ? Number.MAX_VALUE : Number.MIN_VALUE;

        return number;
    }

    public static parseColor(value: any): string | undefined {
        if (value === undefined)
            return undefined;

        const isInvalidColor = typeof value !== 'string' || !value.trim().startsWith('#') || value.trim().length < 7;
        return isInvalidColor ? '#000000' : value.trim().slice(0, 7);
    }

    public evaluateExpression(expression: ExpressionNode): [any, Set<string>] {
        const evaluator = new Evaluator(this.variables);
        let value = evaluator.evaluateExpression(expression);
        if (typeof value === 'number') {
            value = Math.floor(value * 10000) / 10000;
        }
        return [value, evaluator.queries];
    }
}
