import config from "../../config";
const S12PacketEntityVelocity = Java.type("net.minecraft.network.play.server.S12PacketEntityVelocity")

register("packetReceived",(packet,event)=>{
	if (!config.vertJerry) return;
    if (packet?.func_149410_e() !== 4800 && Player.getHeldItem()?.getID() !== 418) return;

	if (packet?.func_149412_c() == Player.getPlayer()?.func_145782_y()) {		
		cancel(event);
		Player.getPlayer().func_70016_h(Player.getMotionX(),0.6,Player.getMotionZ());
	}
}).setFilteredClass(S12PacketEntityVelocity)