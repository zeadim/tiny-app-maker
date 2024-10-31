import { FileObject } from "./file-object";

export class BufferFile extends FileObject {
    private arrayBuffer?: ArrayBuffer;

    public override async loadFromBlob(blob: Blob): Promise<void> {
        await super.loadFromBlob(blob);
        this.arrayBuffer = await blob.arrayBuffer();
    }
}
