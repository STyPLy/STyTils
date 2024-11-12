import config from '../../config'
const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat")

function AutoFreeze() {
    let inventory = Player.getInventory().getItems()
    let FF = false
    let ffIndex
    inventory.forEach((item,index)=>{
        if (item?.getName()?.includes("Fire Freeze") && index < 9) {
            FF = true;
            ffIndex = index
        }
    })
    if (!FF) return;
    
    Player.setHeldItemIndex(ffIndex)
    if (Player.getHeldItem().getName().includes("Fire Freeze")) {
        let rc = Client.getMinecraft().class.getDeclaredMethod('func_147121_ag')
        rc.setAccessible(true)
        setTimeout(()=>{
            rc.invoke(Client.getMinecraft())
        },50)
    }
       
}

register("packetReceived", (packet, event)=>{
    if (packet.func_148916_d()) return

    const chatComponent = packet.func_148915_c()
    const formatted = chatComponent.func_150254_d().removeFormatting()
    if (formatted !== "[BOSS] The Professor: Even if you took my barrier down, I can still fight.") return;
    if (!config.FireFreeze) return;

    setTimeout(()=> {

        ChatLib.chat("§4Fire Freeze!")
        Client.showTitle(" ", "§4Fire Freeze!", 0, 30, 0);
        Client.showTitle(" ", "§4Fire Freeze!", 0, 30, 0);
        World.playSound("mob.ghast.scream",1,1)
        World.playSound("mob.ghast.scream",1,1)

        if (config.autoFreeze && Player.getY() == 71) AutoFreeze();
    },2500)



}).setFilteredClass(S02PacketChat)