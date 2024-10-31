import { App } from "../app";

export abstract class FileObject {
    protected app: App;

    public blob?: Blob;

    public constructor(app: App) {
        this.app = app;
    }

    public async loadFromBlob(blob: Blob): Promise<void> {
        this.blob = blob;
    }
}
