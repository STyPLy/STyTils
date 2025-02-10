import config from "../../config"
import { inDungeon, getShitterList, saveShitterList } from "../../utils"
let Deaths = {}


register("worldLoad",()=> {
    if (!inDungeon()) {
        Deaths = {}
    }
})



register("chat", (name,event) => {  
    if (!inDungeon()) return;
    if(!config.autoShitter) return;
    let message = ChatLib.getChatMessage(event)
    if (message.includes('reconnected') || message.includes('Cata Level')) {return}
    if (message.includes('You') || message.includes(Player.getName())) {return}
    if (!Deaths[name]) {Deaths[name] = 1;}

    if (Deaths[name] == config.deathToShitters) {
        
        let data = getShitterList();
        if (data.shitters[name.toLowerCase()]) return;
        if (data.whitelist.findIndex(i => i === name.toLowerCase()) !== -1) return;

        data.shitters[name.toLowerCase()] = "Died too many times in dungeons - Auto Shitter";
        saveShitterList(data)
        ChatLib.chat("&b[STyTils] Added " + name + " to the shitter list.");
        return;
    }
    else Deaths[name] += 1
}).setCriteria(/^ ☠ (\S+) .+/)


register("chat",(name,event)=>{
    if (!inDungeon() || !config.puzzleFail) return;
    if (name == Player.getName()) return;

    let data = getShitterList();
    if (data.shitters[name.toLowerCase()]) return;
    if (data.whitelist.findIndex(i => i === name.toLowerCase()) !== -1) return;
    
    data.shitters[name.toLowerCase()] = "Failed a puzzle - Auto Shitter";
    saveShitterList(data)
    ChatLib.chat("&b[STyTils] Added " + name + " to the shitter list.");
    return;
    

}).setCriteria(/^PUZZLE FAIL! (\S+) .+$/)

register("chat",(name,event)=>{
    if (!inDungeon() || !config.puzzleFail) return;
    if (name == Player.getName()) return;

    let data = getShitterList();
    if (data.whitelist.findIndex(i => i === name.toLowerCase()) !== -1) return;
    if (data.shitters[name.toLowerCase()]) return;

    data.shitters[name.toLowerCase()] = "Failed a puzzle - Auto Shitter";
    saveShitterList(data);
    ChatLib.chat("&b[STyTils] Added " + name + " to the shitter list.");
    return;
}).setCriteria(/^\[STATUE\] Oruo the Omniscient: (\S+) chose the wrong answer!.*/)