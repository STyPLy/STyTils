import config from "../../config"
import { inDungeon } from "../../utils";

register("step",()=>{
    if(!config.refillPearl) return;
    if (!inDungeon()) return;
    if (Player?.getContainer()?.size !== 45) return;

    let inventory = Player.getInventory().getItems()
    let containsPearls = false
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        if (item?.getName()?.includes("Ender Pearl")) {
            containsPearls = true;
        }
    }

    if (!containsPearls) {
        ChatLib.command("gfs Ender_Pearl 16")
    }
}).setDelay(1)