import { createFileObject, getAcceptedMimeTypesFromFileType } from "../common";
import { FileType } from "../types";
import { Component } from "./component";

export class $FileInput extends Component {
    private input!: HTMLInputElement;
    private outputVariable!: string;
    private fileType!: FileType;

    protected override createHtmlElement(): HTMLElement {
        this.input = document.createElement('input');

        this.input.setAttribute('type', 'file');
        this.input.style.minWidth = '0';
        this.input.style.minHeight = '0';

        this.outputVariable = this.getInputVariable('output-file-id');

        this.addInputStringListener('file-type', (value) => {
            this.fileType = value as FileType ?? 'buffer';
            this.input.setAttribute('accept', getAcceptedMimeTypesFromFileType(this.fileType));
        });

        this.input.addEventListener('input', async () => {
            const file = this.input.files?.[0];
            if (!file)
                return;

            const blob = new Blob([file], { type: file.type });
            const fileObject = await createFileObject(this.app, this.fileType, blob, file.name);

            const addressable = this.app.createAddressable(this.fileType, fileObject);
            this.app.setVariableValue(this.outputVariable, addressable.id);
        });

        return this.input;
    }
}
