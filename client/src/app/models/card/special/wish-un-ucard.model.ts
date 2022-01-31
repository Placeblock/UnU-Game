import { Round } from "../../round.model";
import { UnUCard } from "../un-ucard.model";
import { Draw4UnUCard } from "./draw4-un-ucard.model";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class WishUnUCard extends SpecialUnUCard{
    protected weight: number = 59;

    isValidNextCard(round: Round, card: UnUCard): boolean {
        if("color" in card && (card as any)["color"] != round.getForcedColor()) return false;
        if(card instanceof WishUnUCard && !round.getSettings().allowwishonwish) return false;
        if(card instanceof Draw4UnUCard && !round.getSettings().allowdraw4onwish) return false;
        return true;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"special"};
    }
    
    
}