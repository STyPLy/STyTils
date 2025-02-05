import config from "../../config"

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity")

register('tick',()=> {
    if (!config.autoGift) return;
    let entities = World.getAllEntitiesOfType(ArmorStand)
    for (let entity of entities) {
        if (entity?.name == "§e§lCLICK TO OPEN" || entity?.name == "§e§lCLICK TO EAT") {
            if (entity.distanceTo(Player.asPlayerMP()) > 6) return;
            let packet = new C02PacketUseEntity(entity.getEntity(),C02PacketUseEntity.Action.INTERACT)
            Client.sendPacket(packet);
            break;
        }
    }
})