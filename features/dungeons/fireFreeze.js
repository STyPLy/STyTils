import config from '../../config'
import { rightClick } from '../../utils'
const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat")

function AutoFreeze() {
    let inventory = Player.getInventory().getItems()
    let FF = false
    let ffIndex
    inventory.forEach((item,index)=>{
        if (item?.getName()?.includes("Fire Freeze") && index < 9 && index > -1) {
            FF = true;
            ffIndex = index
        }
    })
    if (!FF) return;
    
    Player.setHeldItemIndex(ffIndex)

    if (Player.getHeldItem()?.getName().includes("Fire Freeze")) {
        rightClick()
    }
       
}

register("packetReceived", (packet, event)=>{
    if (!config.FireFreeze) return;
    if (packet.func_148916_d()) return

    const chatComponent = packet.func_148915_c()
    const formatted = chatComponent.func_150254_d().removeFormatting()
    if (formatted !== "[BOSS] The Professor: Even if you took my barrier down, I can still fight.") return;

    setTimeout(()=> {

        ChatLib.chat("§4Fire Freeze!")
        Client.showTitle(" ", "§4Fire Freeze!", 0, 30, 0);
        Client.showTitle(" ", "§4Fire Freeze!", 0, 30, 0);
        World.playSound("mob.ghast.scream",1,1)
        World.playSound("mob.ghast.scream",1,1)

        if (config.autoFreeze && Player.getY() == 71) AutoFreeze();
    },2500)



}).setFilteredClass(S02PacketChat)