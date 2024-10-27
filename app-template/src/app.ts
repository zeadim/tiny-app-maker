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

    public getVariableValue(variable: string | undefined): unknown {
        return variable ? this.variables.get(variable) : undefined;
    }

    public setVariableValue(variable: string | undefined, value: any): void {
        if (!variable)
            return;

        this.variables.set(variable, value);
        const event = new CustomEvent('update', { detail: { variable, value }});
        this.dispatchEvent(event);
    }

    public getExternalObject(id: string | undefined): any {
        return id ? this.externalObjects.get(id) : undefined;
    }

    public setExternalObject(id: string | undefined, value: any): void {
        if (!id)
            return;

        this.externalObjects.set(id, value);
    }

    public removeExternalObject(id: string | undefined): void {
        if (!id)
            return;

        this.externalObjects.delete(id);
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
}
