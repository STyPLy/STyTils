import config from "../config"

let queueCommands = false
let queueTime = Date.now()
let queued = false

register("worldLoad", ()=> {
    if (!config.queueCommands) return;
    queueCommands = true
    queueTime = Date.now()
    setTimeout(() => {
        queueCommands = false
    }, 4100);
})
register("command", (person="")=> {
    if (queued) return;
    if (!queueCommands) {ChatLib.command("ah " + person); return;}
    queued = true
    setTimeout(() => {
        queued = false
        ChatLib.command("ah " + person)
    },4000-(Date.now() - queueTime))
    
}).setName("ah").setAliases("auction")

register("command", (place="") => {
    if (queued) return;
    if (!queueCommands) {ChatLib.command("warp " + place); return;}
    queued = true
    setTimeout(() => {
        queued = false
        ChatLib.command("warp " + place)
    },4000-(Date.now() - queueTime))
}).setName("warp")


register("command", (product="")=> {
    if (queued) return;
    if (!queueCommands) {ChatLib.command("bz " + product); return;}
        
    queued = true
    setTimeout(() => {
        queued = false
        ChatLib.command("bz " + product)
    },4000-(Date.now() - queueTime))
    
}).setName("bz").setAliases("bazaar")

