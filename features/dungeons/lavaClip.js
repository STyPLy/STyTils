import { getKeybind } from "../../utils";
const S12PacketEntityVelocity = Java.type("net.minecraft.network.play.server.S12PacketEntityVelocity");
let distance = 28;
let toggled = false;

new KeyBind("Lava Clip", getKeybind("Lava Clip"), "STyTils").registerKeyPress(()=>{
    toggled = !toggled
    ChatLib.chat("Lava Clip: " + toggled)
})

register("command",(dist)=>{
    if (!dist) return;
    distance = dist
    ChatLib.chat("Set Lava Clip Distance")
}).setName("lavaclip")

register("tick",()=>{
    if (toggled && Player.getPlayer().func_180799_ab()) {
        let trigger = register("packetReceived", (packet,event) => {
            if (packet?.func_149410_e() != 28000 || packet?.func_149412_c() != Player.getPlayer()?.func_145782_y()) return;
            cancel(event);
        }).setFilteredClass(S12PacketEntityVelocity)
        
        toggled = false;
        Player.getPlayer().func_70107_b(Player.getX(),Player.getY()-distance,Player.getZ())
        
        Client.scheduleTask(80,()=>{
            trigger?.unregister();
        })
    }
})