import { App } from "./app";
import { AudioFile } from "./file-objects/audio-file";
import { BufferFile } from "./file-objects/buffer-file";
import { FileObject } from "./file-objects/file-object";
import { ImageFile } from "./file-objects/image-file";
import { TextFile } from "./file-objects/text-file";
import { VideoFile } from "./file-objects/video-file";
import { FileType } from "./types";

export function getAcceptedMimeTypesFromFileType(fileType: FileType): string {
    switch (fileType) {
        case 'text':
            return 'text/plain';

        case 'audio':
            return 'audio/*';

        case 'image':
            return 'image/*';

        case 'video':
            return 'video/*';

        default:
            return '*/*';
    }
}

export async function createFileObject(app: App, fileType: FileType, blob: Blob, name?: string): Promise<FileObject> {
    let object: FileObject;

    switch (fileType) {
        case 'text':
            object = new TextFile(app, name);
            break;

        case 'audio':
            object = new AudioFile(app, name);
            break;

        case 'image':
            object = new ImageFile(app, name);
            break;

        case 'video':
            object = new VideoFile(app, name);
            break;

        default:
            object = new BufferFile(app, name);
            break;
    }

    await object.loadFromBlob(blob);

    return object;
}
