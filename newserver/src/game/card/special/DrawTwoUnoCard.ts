import { Round } from "../../Round";
import { Colorable } from "../Colorable";
import { UnoCard } from "../UnoCard";
import { DrawFourUnoCard } from "./DrawFourUnoCard";
import { SpecialUnoCard } from "./SpecialUnoCard";

export class DrawTwoUnoCard extends SpecialUnoCard implements Colorable {
    protected readonly color: string;

    isValidNextCard(round: Round, card: UnoCard) {
        if(card instanceof DrawFourUnoCard && !round.getSettings().allowdraw2ondraw4) return false;
        if("color" in card && card["color"] != this.color) return false;
        return true;
    }

    getColor() {
        return this.color;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"draw2","color": this.color};
    }
    
}