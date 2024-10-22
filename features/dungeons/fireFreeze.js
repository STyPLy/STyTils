import config from '../../config'
const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat")

register("packetReceived", (packet, event)=>{
    if (packet.func_148916_d()) return

    const chatComponent = packet.func_148915_c()
    const formatted = chatComponent.func_150254_d().removeFormatting()
    if (formatted !== "[BOSS] The Professor: Even if you took my barrier down, I can still fight.") return;
    if (!config.FireFreeze) return;
    
    setTimeout(()=> {

        ChatLib.chat("§4Fire Freeze!")
        Client.showTitle(" ", "§4Fire Freeze!", 0, 30, 0);

        if (Player.getHeldItem().getName().includes("Fire Freeze") && config.autoFreeze) {
            let rc = Client.getMinecraft().class.getDeclaredMethod('func_147121_ag')
            rc.setAccessible(true)
            rc.invoke(Client.getMinecraft())
        }
    },2500)



}).setFilteredClass(S02PacketChat)