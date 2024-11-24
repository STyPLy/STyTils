import config from "../config"

let queueCommands = false
let queueTime = Date.now()
let queued = false

function queueCommand(cmd, ...args) {
    if (queued) return;
    if ((Date.now() - queueTime) < 0) return;
    if (!queueCommands) {ChatLib.command(cmd + " " + args.join().replace(/\,+/g, " ")); return;}
        
    queued = true
    setTimeout(() => {
        queued = false
        ChatLib.command(cmd + " " + args.join(" "))
    },4000-(Date.now() - queueTime))

}

register("worldLoad", ()=> {
    if (!config.queueCommands) return;
    
    
    queueCommands = true
    queueTime = Date.now()
    setTimeout(() => {
        queueCommands = false
    }, 4100);
})
let list = config.commandList.replace(/\s+/g, '').split(",")
for (let i = 0; i < list.length; i++) {
    if (!list[i]) continue;
    let val = list[i]
    register("command",(...args)=>{
        queueCommand(val,args);
    }).setName(list[i])
}