import config from "../../config"
function inDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

register("step",()=>{
    if(!config.refillPearl) return;
    if (!inDungeon()) return;
    if (Player?.getContainer()?.size !== 45) return;

    let inventory = Player.getInventory().getItems()
    let containsPearls = false
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        if (item?.getName() == "§fEnder Pearl") {
            containsPearls = true;
        }
    }

    if (!containsPearls) {
        ChatLib.command("gfs Ender_Pearl 16")
    }
}).setDelay(1)