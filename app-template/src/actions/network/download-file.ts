import { createFileObject, getAcceptedMimeTypesFromFileType } from "../../common";
import { FileObject } from "../../file-objects/file-object";
import { FileType } from "../../types";
import { Action } from "../action";

export class $DownloadFile extends Action {

    public override async execute(): Promise<number | undefined> {
        const url = this.getInputString('url');
        const fileType = this.getInputString('file-type') as FileType ?? 'buffer';
        const outputVariable = this.getInputVariable('output-file-id');

        let object: FileObject;

        try {
            const response = await fetch(url, {
                headers: {
                    'accept': getAcceptedMimeTypesFromFileType(fileType),
                },
            });

            if (!response.ok)
                return undefined;

            const blob = await response.blob();
            
            const { pathname } = new URL(url);
            const index = pathname?.lastIndexOf('/') ?? -1;
            const name = index < 0 ? '' : pathname.slice(index + 1);

            object = await createFileObject(this.app, fileType, blob, name);
        } catch (err) {
            return undefined;
        }

        const addressable = this.app.createAddressable(fileType, object);
        this.app.setVariableValue(outputVariable, addressable.id);

        return undefined;
    }
}
