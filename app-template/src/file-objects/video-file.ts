import { FileObject } from "./file-object";

export class VideoFile extends FileObject {
    private objectUrl?: string;

    public override async loadFromBlob(blob: Blob): Promise<void> {
        await super.loadFromBlob(blob);
        this.objectUrl = URL.createObjectURL(blob);
    }
}
