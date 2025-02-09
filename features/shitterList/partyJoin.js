import config from "../../config"
import { getShitterList } from "../../utils";

function checkParty(data) {
    if (!config.partyScanner) return;
    ChatLib.chat("&b[STyTils] Scanning Party for shitters")
    let inDH = false
    let index = -1
    let tablist = TabList?.getNames()
    tablist?.forEach((key,i) => {
        let str = key.removeFormatting()
        if (str.includes("Area: Dungeon Hub")) inDH = true;
        if (str.includes("Party: ")) index = i;
    })
    let size = parseInt(tablist[index].removeFormatting().substring(8,9))
    if (!inDH || !tablist || index === -1 || !size) {ChatLib.chat("&b[STyTils] Party Scan Failed.");return};
    
    for (let i = index+1; i < index+size+1; i++) {
        let plr = tablist[i]?.split(":")[0].replace(/\s+/g, '').toLowerCase()
        if (data.shitters[plr]) {
            ChatLib.chat("&b[STyTils] " + plr + " is a shitter!")
        }
    }

}


// Checks Shitter List on party finder join
register("chat", (ign) => {
    let data = getShitterList()
    if (ign == Player.getName()) {
        setTimeout(()=>{
            checkParty(data)
        },10000)
        
    }
    if (data.shitters[ign.toLowerCase()]) {
        if (config.joinMessage) {
            setTimeout(()=> {
                let text = config.shitterMessage
                text = text.replaceAll("$ign", ign)
                text = text.replaceAll("$reason",data.shitters[ign.toLowerCase()])
                ChatLib.command("pc " + text);
                
            },500);
        }
        if (config.autoKick) {
            setTimeout(()=>{
                ChatLib.command("p kick " + ign);
            },1000)
        }
        
    }
}).setCriteria(/^Party Finder > (\S+) joined the dungeon group! \(\w+ Level \d+\)$/)

// Checks for regular party join
register("chat", (rank,ign) => {
    let data = getShitterList();

    if (data.shitters[ign.toLowerCase()]) {
        if (config.joinMessage) {
            setTimeout(()=> {
                let text = config.shitterMessage
                text = text.replace("$ign", ign)
                text = text.replace("$reason",data.shitters[ign.toLowerCase()])
                ChatLib.command("pc " + text);
                
            },500);
        }
        if (config.autoKick) {
            setTimeout(()=>{
                ChatLib.command("p kick " + ign);
            },1000)
        }
        
    }
}).setCriteria(/(?:\[(VIP|VIP\+|MVP|MVP\+|MVP\+\+)\]\s*)?(\w+) joined the party\./)

register("chat",()=>{
    let data = getShitterList();
    setTimeout(()=>{
        checkParty(data)
    },10000)
}).setCriteria(/You have joined (?:\[(?:VIP|VIP\+|MVP|MVP\+|MVP\+\+)\]\s)?([\w]+)'s party!/)