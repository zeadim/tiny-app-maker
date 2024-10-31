import { Action } from "../action";

export class $Speak extends Action {

    public override async execute(): Promise<number | undefined> {
        const text = this.getInputString('text');
        const async = this.getInputBoolean('async');

        const utterance = new SpeechSynthesisUtterance(text);
        //utterThis.voice = window.speechSynthesis.getVoices()[0];
        window.speechSynthesis.cancel(); // Stop all other utterances
        window.speechSynthesis.speak(utterance);

        if (!async)
            await new Promise<void>((resolve) => utterance.onend = () => resolve());
        
        return undefined;
    }
}
