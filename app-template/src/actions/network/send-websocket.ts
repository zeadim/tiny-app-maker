import { Action } from "../action";

export class $SendWebSocket extends Action {

    public override async execute(): Promise<number | undefined> {
        const webSocketId = this.getInput('websocket');
        const message = this.getInput('message');

        const webSocket = this.app.getExternalObject(webSocketId) as WebSocket;
        try {
            webSocket.send(message);
        } catch (err) {
            //
        }

        return undefined;
    }
}
