import config from "../../config";

const C0BPacketEntityAction = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction");
const SharedMonsterAttribute = Java.type("net.minecraft.entity.SharedMonsterAttributes")
const UUID = Java.type("java.util.UUID")
const omniSprintId = UUID.fromString("6d931c598-1c1d-4f19-86b4-91a32f9c7309");
const AttributeModifier = Java.type("net.minecraft.entity.ai.attributes.AttributeModifier");
const sprintAttribute = new AttributeModifier(omniSprintId,"Omni Sprint",0.30000001192092896,2).func_111168_a(false);

const regularSprintId = UUID.fromString("662A6B8D-DA3E-4C1C-8813-96EA6097278D")
const regularSprint = new AttributeModifier(regularSprintId, "Sprinting speed boost", 0.30000001192092896, 2).func_111168_a(false);

register("packetSent",(packet,event)=>{
    if (
        (packet.func_180764_b() == C0BPacketEntityAction.Action.START_SPRINTING ||
        packet.func_180764_b() == C0BPacketEntityAction.Action.STOP_SPRINTING) &&
        config.omniSprint
    ) {
        cancel(event)
    }
}).setFilteredClass(C0BPacketEntityAction)


register("tick",()=>{
    if (!config.omniSprint) return;
    let movementSpeed = Player.getPlayer().func_110148_a(SharedMonsterAttribute.field_111263_d)
    if (!movementSpeed.func_111127_a(omniSprintId)) {
        movementSpeed.func_111121_a(sprintAttribute);
        
    }
    Player.getPlayer().func_70031_b(true);
    movementSpeed.func_111124_b(regularSprint);
})