import { App } from "../../app";
import { Action } from "../action";

export class $OpenWebSocket extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const webSocketVariable = this.getInputString('output-websocket');
        const lastMessageVariable = this.getInputString('output-last-message');

        const webSocket = new WebSocket(url);

        const id = App.generateUniqueId('websocket');
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
