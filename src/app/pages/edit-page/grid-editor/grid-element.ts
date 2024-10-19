export class GridElement {
    public htmlElement: HTMLElement;

    private events: Map<string, (event: any) => unknown>;

    public constructor(htmlElement: HTMLElement) {
        this.htmlElement = htmlElement;

        this.events = new Map();
    }

    public setEventListener(eventName: string, handler: (event: any) => unknown): void {
        if (this.events.has(eventName))
            this.htmlElement.removeEventListener(eventName, this.events.get(eventName)!);

        const overriddenHandler = (event: Event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            handler(event);
        };
        this.htmlElement.addEventListener(eventName, overriddenHandler, { passive: false });
        this.events.set(eventName, overriddenHandler);
    }

    public destroy(): void {
        for (const [eventName, listener] of this.events)
            this.htmlElement.removeEventListener(eventName, listener, false);

        this.htmlElement.remove();
    }
}
