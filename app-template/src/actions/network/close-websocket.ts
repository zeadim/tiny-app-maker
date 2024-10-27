import { Action } from "../action";

export class $CloseWebSocket extends Action {

    public override async execute(): Promise<number | undefined> {
        const websocketId = this.getInputString('websocket');

        const webSocket = this.app.getExternalObject(websocketId) as WebSocket;
        try {
            webSocket.close();
        } catch (err) {
            //
        } finally {
            this.app.removeExternalObject(websocketId);
        }
        
        return undefined;
    }
}
