import { Action } from "../action";

export class $CloseWebSocket extends Action {

    public override async execute(): Promise<number | undefined> {
        const webSocketId = this.getInputString('websocket');

        try {
            const webSocket = this.app.getAddressableObject<WebSocket>(webSocketId, 'websocket');
            webSocket?.close();
        } catch (err) {
            //
        } finally {
            this.app.removeAddressable(webSocketId);
        }
        
        return undefined;
    }
}
