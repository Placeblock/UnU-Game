import { Round } from "../../Round";
import { UnoCard } from "../UnoCard";
import { DrawTwoUnoCard } from "./DrawTwoUnoCard";
import { SpecialUnoCard } from "./SpecialUnoCard";
import { WishUnoCard } from "./WishUnoCard";

export class DrawFourUnoCard extends SpecialUnoCard{
    getRandom(): UnoCard {
        return new DrawFourUnoCard();
    }

    isValidNextCard(round: Round, card: UnoCard) {
        if("color" in card && card["color"] != round.getForcedColor()) return false;
        if(card instanceof DrawTwoUnoCard && !round.getSettings().allowdraw2ondraw4) return false;
        if(card instanceof DrawFourUnoCard && !round.getSettings().allowdraw4ondraw4) return false;
        if(card instanceof WishUnoCard && !round.getSettings().allowwishondraw4) return false;
        return true;
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"draw4"};
    }

}