import { Round } from "../../round.model";
import { UnUCard } from "../un-ucard.model";
import { Draw2UnUCard } from "./draw2-un-ucard.model";
import { SpecialUnUCard } from "./special-un-ucard.model";
import { WishUnUCard } from "./wish-un-ucard.model";

export class Draw4UnUCard extends SpecialUnUCard{
    protected weight: number = 60;

    isValidNextCard(round: Round, card: UnUCard) {
        if("color" in card && (card as any)["color"] != round.getForcedColor()) return false;
        if(card instanceof Draw2UnUCard && !round.getSettings().allowdraw2ondraw4) return false;
        if(card instanceof Draw4UnUCard && !round.getSettings().allowdraw4ondraw4) return false;
        if(card instanceof WishUnUCard && !round.getSettings().allowwishondraw4) return false;
        return true;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"draw4"};
    }

}