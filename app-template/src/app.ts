import { Component } from "./components/component";

export class App extends EventTarget {
    private gridElement: HTMLElement;
    private components: Component[] = [];
    private variables: Map<string, any> = new Map();
    private externalObjects: Map<string, any> = new Map(); // Maps unique ID to objects like WebSocket, Audio etc.

    public constructor(gridElement: HTMLElement) {
        super();
        this.gridElement = gridElement;
    }

    public addComponent(component: Component): void {
        this.components.push(component);
        this.gridElement.appendChild(component.htmlElement);
    }

    public getVariableValue(variable: string): unknown {
        return variable ? this.variables.get(variable) : undefined;
    }

    public setVariableValue(variable: string, value: any): void {
        if (!variable)
            return;

        this.variables.set(variable, value);
        const event = new CustomEvent('update', { detail: { variable, value }});
        this.dispatchEvent(event);
    }

    public getExternalObject(id: string): any {
        return id ? this.externalObjects.get(id) : undefined;
    }

    public setExternalObject(id: string, value: any): void {
        if (!id)
            return;

        this.externalObjects.set(id, value);
    }

    public removeExternalObject(id: string): void {
        if (!id)
            return;

        this.externalObjects.delete(id);
    }

    public static generateUniqueId(prefix?: string): string {
        // TODO: use proper UUID algorithm
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let s = '';
        for (let i = 0; i < 6; i++) {
            const i = Math.floor(Math.random() * chars.length);
            s += chars[i];
        }

        if (prefix) {
            return `${prefix}(${s})`;
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
}
