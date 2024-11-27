import { ActionNode, ComponentNode, GlobalEventNode, LocalEventNode, ProgramNode, SettingNode } from "./parser";
import { ActionState, ComponentState, EventState, GlobalEventState, InputState, State } from "./state";

export class Converter {

    public convertProgram(program: ProgramNode): State {
        return {
            settings: program.settings?.configuration?.settings.map(x => this.convertSetting(x)) ?? [],
            gridEditor: {
                width: program.settings?.width ?? 6,
                height: program.settings?.height ?? 10,
                components: program.components.map(x => this.convertComponent(x)),
            },
            globalEvents: program.globalEvents.map(x => this.convertGlobalEvent(x)),
        }
    }

    public convertComponent(component: ComponentNode): ComponentState {
        return {
            name: component.name,
            x0: component.x,
            y0: component.y,
            x1: component.x + component.width,
            y1: component.y + component.height,
            inputs: component.configuration?.settings.map(x => this.convertSetting(x)) ?? [],
            events: component.configuration?.events.map(x => this.convertLocalEvent(x)) ?? [],
        };
    }

    public convertGlobalEvent(globalEvent: GlobalEventNode): GlobalEventState {
        return {
            name: globalEvent.name,
            x0: 0,
            y0: 0,
            x1: 1,
            y1: 1,
            inputs: globalEvent.configuration?.settings.map(x => this.convertSetting(x)) ?? [],
            events: globalEvent.configuration?.events.map(x => this.convertLocalEvent(x)) ?? [],
        };
    }

    public convertLocalEvent(localEvent: LocalEventNode): EventState {
        return {
            name: localEvent.name,
            actions: localEvent.actions.map(x => this.convertAction(x)),
        };
    }

    public convertAction(action: ActionNode): ActionState {
        return {
            name: action.name,
            inputs: action.configuration?.settings.map(x => this.convertSetting(x)) ?? [],
        };
    }

    public convertSetting(setting: SettingNode): InputState {
        return {
            name: setting.name,
            value: setting.expression,
            variable: true,
        };
    }
}
