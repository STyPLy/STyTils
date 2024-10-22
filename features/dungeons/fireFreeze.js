import config from '../../config'

register("chat",()=>{
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
}).setCriteria("&r&c[BOSS] The Professor&r&f: Even if you took my barrier down, I can still fight.&r")