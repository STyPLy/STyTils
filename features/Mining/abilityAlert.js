import config from '../../config'

let lastUpdate = Date.now()

register("chat",()=>{
    if (!config.abilityAlert) return;
    Client.showTitle("","&aAbility Ready!", 0,30,0)
    Client.showTitle("","&aAbility Ready!", 0,30,0)
    Client.showTitle("","&aAbility Ready!", 0,30,0)
    World.playSound("random.anvil_land",1,1)
    ChatLib.chat(`&b[STyTils] ${(Date.now()-lastUpdate)/1000} seconds`)
    lastUpdate = Date.now()
}).setCriteria(/^([A-Za-z]+(?: [A-Za-z]+){1,2}) is now available!$/)