import config from "../config"
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
    if (!Deaths[name]) {Deaths[name] = 0;}

    if (Deaths[name] == config.deathToShitters) {
        
        let data = FileLib.read("STyTils","data.json");
        try {
            data = data ? JSON.parse(data) : {};
        } catch (e) {
            console.log(e);
        }
        
        data[name.toLowerCase()] = true;
        FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true);
        ChatLib.chat("&b[SL] Added " + name + " to the shitter list.");
        return;
    }
    else Deaths[name] += 1
}).setCriteria(/^ ☠ (\S+) .+/)