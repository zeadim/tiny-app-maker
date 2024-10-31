import { App } from "../app";

export abstract class FileObject {
    protected app: App;

    public fileName: string;
    public mimeType: string = '';

    public constructor(app: App, fileName?: string) {
        this.app = app;
        this.fileName = fileName ?? '';
    }

    public async loadFromBlob(blob: Blob): Promise<void> {
        this.mimeType = blob.type;
    }
}
