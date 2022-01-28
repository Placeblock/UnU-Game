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

    asJSON(): {} {
        return {"action":this.action,"player":this.player.asJSON(),"inventory":this.inventory.asJSON()};
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getInventory(): Inventory {
        return this.inventory;
    }
}