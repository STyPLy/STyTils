let stand = Java.type("net.minecraft.entity.item.EntityArmorStand")
let C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity")
let C02PacketUseEntityAction = Java.type("net.minecraft.network.play.client.C02PacketUseEntity.Action")

register('tick',()=> {
    let entities = World.getAllEntitiesOfType(stand)
    for (let entity of entities) {
        if (entity?.name == "§e§lCLICK TO OPEN" || entity?.name == "§e§lCLICK TO EAT") {
            let packet = new C02PacketUseEntity(entity.getEntity(),C02PacketUseEntity.Action.INTERACT)
            Client.sendPacket(packet);
            break;
        }
    }
})