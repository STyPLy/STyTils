import config from '../../config';

const S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook")
const C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer")

register("packetReceived",(packet,event)=>{
    if (!config.noRotate || !Player?.getPlayer()) return;
    let [x, y, z, yaw, pitch] = [
        packet.func_148932_c(),
        packet.func_148928_d(),
        packet.func_148933_e(),
        packet.func_148931_f(),
        packet.func_148930_g()
    ];

    if (pitch === 0 && config.ignorePitch) return;

    cancel(event)

    // Teleport Player (no rotate)
    Player?.getPlayer()?.func_70107_b(x,y,z)
    
    // Send C06 response packet
    Client.sendPacket(new C03PacketPlayer.C06PacketPlayerPosLook(
        Player.getX(),
        Player.getPlayer().func_174813_aQ().field_72338_b,
        Player.getZ(),
        yaw,
        pitch,
        false
    ));
    
    // ternary operator type shit
    config.keepMotion 
        ? Player.getPlayer().func_70016_h(Player.getMotionX(),0,Player.getMotionZ())
        : Player.getPlayer().func_70016_h(0,0,0);
    
}).setFilteredClass(S08PacketPlayerPosLook)