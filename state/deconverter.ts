import { ActionState, ComponentState, EventState, GlobalEventState, InputState, State } from "./state";

const INDENT = "\t";

export class Deconverter {
    private code = "";
    private indentationLevel = 0;

    public deconvertProgram(state: State): string {
        this.write(`settings (${state.gridEditor.width}, ${state.gridEditor.height})`);
        if (state.settings.length > 0) {
            this.pushBlock();
            for (const setting of state.settings) {
                this.deconvertInput(setting);
            }
            this.popBlock();
        } else {
            this.writeLine("");
        }
        for (const component of state.gridEditor.components) {
            this.writeLine("");
            this.deconvertComponent(component);
        }
        for (const globalEvent of state.globalEvents) {
            this.writeLine("");
            this.deconvertGlobalEvent(globalEvent);
        }
        return this.code;
    }

    public deconvertComponent(state: ComponentState): string {
        this.write(`${state.name} (${state.x0}, ${state.y0}, ${state.x1 - state.x0}, ${state.y1 - state.y0})`);
        if (state.inputs.length > 0 || state.events.length > 0) {
            this.pushBlock();
            for (const input of state.inputs) {
                this.deconvertInput(input);
            }
            if (state.inputs.length > 0 && state.events.length > 0) {
                this.writeLine("");
            }
            for (const event of state.events) {
                this.deconvertLocalEvent(event);
            }
            this.popBlock();
        } else {
            this.writeLine("");
        }
        return this.code;
    }

    public deconvertGlobalEvent(state: GlobalEventState): string {
        this.write(`on ${state.name}`);
        if (state.inputs.length > 0 || state.events.length > 0) {
            this.pushBlock();
            for (const input of state.inputs) {
                this.deconvertInput(input);
            }
            if (state.inputs.length > 0 && state.events.length > 0) {
                this.writeLine("");
            }
            for (const event of state.events) {
                this.deconvertLocalEvent(event);
            }
            this.popBlock();
        } else {
            this.writeLine("");
        }
        return this.code;
    }

    public deconvertLocalEvent(state: EventState): string {
        this.write(`on ${state.name}`);
        this.pushBlock();
        for (const input of state.actions) {
            this.deconvertAction(input);
        }
        this.popBlock();
        return this.code;
    }

    public deconvertAction(state: ActionState): string {
        this.write(state.name);
        if (state.inputs.length > 0) {
            this.pushBlock();
            for (const input of state.inputs) {
                this.deconvertInput(input);
            }
            this.popBlock();
        } else {
            this.writeLine("");
        }
        return this.code;
    }

    public deconvertInput(state: InputState): string {
        if (state.value != null) {
            this.writeLine(`${state.name}: ${state.value}`);
        }
        return this.code;
    }

    private write(string: string): void {
        this.code += `${INDENT.repeat(this.indentationLevel)}${string}`;
    }

    private writeLine(string: string): void {
        this.write(`${string}\n`);
    }

    private pushBlock(): void {
        this.code += " {\n";
        this.indentationLevel += 1;
    }

    private popBlock(): void {
        this.indentationLevel -= 1;
        this.writeLine("}");
    }
}
