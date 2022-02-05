import { Inventory } from "../../../../Inventory";
import { Player } from "../../../../player/Player";
import { OutPacket } from "../OutPacket";

export class OutInventoryDataPacket extends OutPacket {
    protected readonly action: string = "inventoryData";
    private readonly player: Player;
    private readonly inventory: Inventory;

    constructor(player: Player, inventory: Inventory) {
        super();
        this.player = player;
        this.inventory = inventory;
    }

    public getInventory(): Inventory {
        return this.inventory;
    }

    public getPlayer(): Player {
        return this.player;
    }

    asJSON(): {} {
        return {"action":this.action,"inventory":this.inventory.asJSON(),"player":this.player.asJSON()};
    }
}