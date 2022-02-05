import { JSONUnUCard } from "../jsonun-ucard";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class WishUnUCard extends SpecialUnUCard{
    protected weight: number = 59;

    static fromJson(json: JSONUnUCard): WishUnUCard {
        return new WishUnUCard();
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"wish"};
    }
    
    
}