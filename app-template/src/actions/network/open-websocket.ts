import { Action } from "../action";

export class $OpenWebSocket extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const webSocketVariable = this.getInputVariable('output-websocket');
        const lastMessageVariable = this.getInputVariable('output-last-message');

        const webSocket = new WebSocket(url);
        const addressable = this.app.createAddressable('websocket', webSocket);
        this.app.setVariableValue(webSocketVariable, addressable.id);

        return new Promise((resolve) => {
            webSocket.onopen = () => resolve(undefined);
            webSocket.onerror = () => resolve(undefined);
            webSocket.onmessage = (event) => {
                this.app.setVariableValue(lastMessageVariable, event.data);
            };
        });
    }
}
