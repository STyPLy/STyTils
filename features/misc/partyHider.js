// Scoreboard, Chat, Tablist
import config from "../../config"

// Get updated team

// Party Chat & Guild Chat
register("chat",(rank, username,message,event)=>{
    if (!config.partyHider) return;
    let team = config.Team
    team = team.replace(/\s+/g, '').split(",")
    team.forEach((key,index)=>{
        if (key == username) {
            cancel(event);
            ChatLib.chat("&9Party &8> &bSTyTils " + index +  "&f: " + message)
            return
        }
    })

}).setCriteria(/^(Party|Guild) >(?: \[(VIP|VIP\+|MVP|MVP\+)\]\s*)? \w+(?: \[\w+\])?: (\S+)/)
