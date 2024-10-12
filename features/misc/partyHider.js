// Scoreboard, Chat, Tablist
import config from "../../config"

// Chat
register("chat",(str,event)=>{
    if (!config.partyHider) return;
    let team = config.team
    team = team.replace(/\s+/g, '').split(",")
    team.forEach((key,index) => {
        if(str.includes(key) || str.toLowerCase().includes(key.toLowerCase())) {
            cancel(event)
            let newMsg = str.replace(key,"STyTils" + index);
            ChatLib.chat(newMsg)
        }
    })
}).setCriteria(/(.*)/)


register("step",()=>{
    if (!config.partyHider) return;
}).setDelay(5)