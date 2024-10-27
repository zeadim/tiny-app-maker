import { App } from "../../app";
import { Action } from "../action";

export class $OpenWebSocket extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInput('url');
        const webSocketVariable = this.getInput('output-websocket');
        const lastMessageVariable = this.getInput('output-last-message');

        const webSocket = new WebSocket(url);

        const id = `ws:${App.generateUniqueId()}`;
        this.app.setVariableValue(webSocketVariable, id);
        this.app.setExternalObject(id, webSocket);

        return new Promise((resolve) => {
            webSocket.onopen = () => resolve(undefined);
            webSocket.onerror = () => resolve(undefined);
            webSocket.onmessage = (event) => {
                this.app.setVariableValue(lastMessageVariable, event.data);
            };
        });
    }
}
