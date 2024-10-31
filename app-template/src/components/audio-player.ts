import { Component } from "./component";

export class $AudioPlayer extends Component {
    private audioPlayer!: HTMLAudioElement;
    private source!: string;

    protected override createHtmlElement(): HTMLElement {
        this.audioPlayer = document.createElement('audio');
        this.source = '';

        this.addInputStringListener('url-or-file-id', (value) => {
            const source = value?.trim() ?? '';
            
            if (this.source === source)
                return;

            this.source = source;

            if (source.startsWith('id:')) {

            } else{
                //
            }
        });
        
        return this.audioPlayer;
    }
}
