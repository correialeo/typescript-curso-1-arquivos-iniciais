import { View } from "./view.js";

export class MensagemView extends View<String>{

    protected template(model: string): string{ //sobrescrita
        return`
            <p class="alert alert-info"> ${model}</p>
        `
    }

}