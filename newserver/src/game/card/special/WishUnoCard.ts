import { Round } from "../../Round";
import { UnoCard } from "../UnoCard";
import { DrawFourUnoCard } from "./DrawFourUnoCard";
import { SpecialUnoCard } from "./SpecialUnoCard";

export class WishUnoCard extends SpecialUnoCard{

    isValidNextCard(round: Round, card: UnoCard) {
        if("color" in card && card["color"] != round.getForcedColor()) return false;
        if(card instanceof WishUnoCard && !round.getSettings().allowwishonwish) return false;
        if(card instanceof DrawFourUnoCard && !round.getSettings().allowdraw4onwish) return false;
        return true;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"special"};
    }
    
}