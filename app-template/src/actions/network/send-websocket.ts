import { Action } from "../action";

export class $SendWebSocket extends Action {

    public override async execute(): Promise<number | undefined> {
        const webSocketId = this.getInputString('websocket');
        const message = this.getInputString('message');

        try {
            const webSocket = this.app.getAddressableObject<WebSocket>(webSocketId, 'websocket');
            webSocket?.send(message);
        } catch (err) {
            //
        }

        return undefined;
    }
}
