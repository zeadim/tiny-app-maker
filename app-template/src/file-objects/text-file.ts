import { FileObject } from "./file-object";

export class TextFile extends FileObject {
    private textContent?: string;

    public override async loadFromBlob(blob: Blob): Promise<void> {
        await super.loadFromBlob(blob);
        this.textContent = await blob.text();
    }
}
