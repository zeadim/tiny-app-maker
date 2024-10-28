import { Action } from "../action";

export class $Speak extends Action {

    public override async execute(): Promise<number | undefined> {
        const text = this.getInputString('text');

        const utterance = new SpeechSynthesisUtterance(text);
        //utterThis.voice = window.speechSynthesis.getVoices()[0];
        window.speechSynthesis.speak(utterance);

        await new Promise((resolve) => utterance.onend = resolve);
        
        return undefined;
    }
}
