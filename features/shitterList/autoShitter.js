import config from "../../config"
let Deaths = {}

function inDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

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
        
        let data = FileLib.read("STyTils","data.json");
        try {
            data = data ? JSON.parse(data) : {};
        } catch (e) {
            console.log(e);
        }
        
        data[name.toLowerCase()] = "Died too many times in dungeons - Auto Shitter";
        FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true);
        ChatLib.chat("&b[SL] Added " + name + " to the shitter list.");
        return;
    }
    else Deaths[name] += 1
}).setCriteria(/^ ☠ (\S+) .+/)


register("chat",(name,event)=>{
    if (!inDungeon() || !config.puzzleFail) return;
    if (name == Player.getName()) return;

    let data = FileLib.read("STyTils","data.json");
    try {
        data = data ? JSON.parse(data) : {};
    } catch (e) {
        console.log(e);
    }
    
    data[name.toLowerCase()] = "Failed a puzzle - Auto Shitter";
    FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true);
    ChatLib.chat("&b[SL] Added " + name + " to the shitter list.");
    return;
    

}).setCriteria(/^PUZZLE FAIL! (\S+) .+$/)

register("chat",(name,event)=>{
    if (!inDungeon() || !config.puzzleFail) return;
    if (name == Player.getName()) return;

    let data = FileLib.read("STyTils","data.json");
    try {
        data = data ? JSON.parse(data) : {};
    } catch (e) {
        console.log(e);
    }
    
    data[name.toLowerCase()] = "Failed a puzzle - Auto Shitter";
    FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true);
    ChatLib.chat("&b[SL] Added " + name + " to the shitter list.");
    return;
}).setCriteria(/^\[STATUE\] Oruo the Omniscient: (\S+) chose the wrong answer!.*/)