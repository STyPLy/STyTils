import { getShitterList, saveShitterList } from "../../utils";
import "./autoShitter"
import "./partyJoin"
import './whitelist'

register("command", (command, ign, ...reason) => {
    if (!command) {ChatLib.chat("&b[STyTils] USAGE: /sl <add/remove/list/clear/why> <username>"); return};
    
    let data = getShitterList();
    
    // if (!data) ChatLib.chat("&cCould not read data.json ?");
    switch (command) {
        case "add":
            if (!ign) return;
            if(!reason) reason = "Manually added to shitter list.".split(" ");
            if (data.shitters[ign.toLowerCase()]) {ChatLib.chat("&b[STyTils] " + ign + " is already on the shitter list."); return}

            data.shitters[ign.toLowerCase()] = reason.join(" ")

            ChatLib.chat("&b[STyTils] Added " + ign + " to the shitter list.")
            break;
        case "remove":
            if (!ign) return;
            if (!data.shitters[ign.toLowerCase()]) {ChatLib.chat("&b[STyTils] " + ign + " is not on the shitter list."); return;}
            delete data.shitters[ign.toLowerCase()]
            FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true)
            ChatLib.chat("&b[STyTils] Removed " + ign + " from the shitter list.")
            break;
        case "list":
            ChatLib.chat("&bShitter List: ")
            let n = 1
            for (let x in data) {
                ChatLib.chat("&6" + n + ". &f&l" + x + "&r: &b" + data[x])
                n += 1
            }
            break;
        case "clear":
            Object.keys(data.shitters).forEach(key => {
                delete data.shitters[key]
            })
            FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true)
            ChatLib.chat("&b[STyTils] Cleared the shitter list.")
            break;
        case "why":
            if (!ign) return
            
            let why = data.shitters[ign.toLowerCase()]
            if (!why) return ChatLib.chat("&b[STyTils] " + ign + " is not on the shitter list.");

            ChatLib.chat("&b[STyTils] &f&l" + ign + "&r: &b" + why)
            break;
        default:   
            ChatLib.chat("&b[STyTils] USAGE: /sl <add/remove> <username>");
            break;
    }
    
    
}).setName("shitter").setAliases("sl","shitterlist");