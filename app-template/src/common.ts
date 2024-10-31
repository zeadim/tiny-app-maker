import { App } from "./app";
import { AudioFile } from "./file-objects/audio-file";
import { BufferFile } from "./file-objects/buffer-file";
import { FileObject } from "./file-objects/file-object";
import { ImageFile } from "./file-objects/image-file";
import { TextFile } from "./file-objects/text-file";
import { VideoFile } from "./file-objects/video-file";
import { FileType } from "./types";

export function isAddressableId(value: string | undefined): boolean {
    return value?.startsWith('id:') ?? false;
}

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

export async function createFileObject(app: App, fileType: FileType, blob: Blob): Promise<FileObject> {
    let object: FileObject;

    switch (fileType) {
        case 'text':
            object = new TextFile(app);
            break;

        case 'audio':
            object = new AudioFile(app);
            break;

        case 'image':
            object = new ImageFile(app);
            break;

        case 'video':
            object = new VideoFile(app);
            break;

        default:
            object = new BufferFile(app);
            break;
    }

    await object.loadFromBlob(blob);

    return object;
}
