import config from "../../config";
import { getClass, inDungeon } from "../../utils";

const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat")
const C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging")
const EnumFacing = Java.type("net.minecraft.util.EnumFacing")
const BlockPosition = Java.type("net.minecraft.util.BlockPos")

register("packetReceived",(packet,_)=>{
    if (packet.func_148916_d() || !inDungeon() || !config.autoWish) return

    const chatComponent = packet.func_148915_c()
    const formatted = chatComponent.func_150254_d().removeFormatting()

    if (formatted !== "⚠ Maxor is enraged! ⚠"
         && formatted !== "[BOSS] Goldor: You have done it, you destroyed the factory…"
          && formatted !== "[BOSS] Sadan: My giants! Unleashed!") 
            return;
    

    let currentClass = getClass(Player)
    if (currentClass.charAt(0) !== "H") return;

    Client.sendPacket(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.DROP_ITEM,BlockPosition.field_177992_a,EnumFacing.DOWN))
}).setFilteredClass(S02PacketChat)