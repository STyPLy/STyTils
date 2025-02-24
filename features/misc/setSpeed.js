import config from '../../config';

register("tick",() => {
    if (!config.setSpeed) return;
    const minecraft = Client.getMinecraft();
    let currentSpeed = minecraft.field_71439_g.field_71075_bZ.func_75094_b()
    let speed = config.bestSpeed ? currentSpeed + (currentSpeed / 33.34) : config.speed / 1000

    minecraft.field_71439_g.func_110148_a(Java.type("net.minecraft.entity.SharedMonsterAttributes").field_111263_d).func_111128_a(speed); // minecraft.thePlayer.getEntityAttribute(SharedMonsterAttributes.movementSpeed).setBaseValue(speed)
})