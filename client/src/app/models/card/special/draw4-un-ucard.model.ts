import { JSONUnUCard } from "../jsonun-ucard";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class Draw4UnUCard extends SpecialUnUCard{
    protected weight: number = 60;

    static fromJson(json: JSONUnUCard): Draw4UnUCard {
        return new Draw4UnUCard();
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"draw4"};
    }

}