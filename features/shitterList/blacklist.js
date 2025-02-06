import { getShitterList, saveShitterList } from "../../utils";


register("command", (command,ign) => {
    if (!command) return ChatLib.chat("&b[STyTils] USAGE: /blacklist <add/remove/list/clear>");

    let data = getShitterList();

    switch (command) {
        case "add":
            if (!ign) return;

            if (data.whitelist.findIndex(i => i === ign.toLowerCase()) !== -1) {ChatLib.chat("&b[STyTils] " + ign + " is already on the blacklist."); return}

            data.whitelist.push(ign.toLowerCase())
            saveShitterList(data);
            ChatLib.chat("&b[STyTils] Added " + ign + " to the blacklist.")
            break;
        case "remove":
            if (!ign) return;
            if (data.whitelist.find(i=> i === ign.toLowerCase()) === -1)
                {ChatLib.chat("&b[STyTils] " + ign + " is not on the blacklist."); return;}
            data.whitelist = data.whitelist.filter(i => i !== ign.toLowerCase())
            ChatLib.chat("&b[STyTils] Removed " + ign + " from the blacklist.")
            saveShitterList(data);

            break;
        case "list":
            ChatLib.chat("&bBlack List: ")
            for (let i = 0; i < data.whitelist.length; i++) {
                let person = data.whitelist[i];
                ChatLib.chat("&6" + (i+1) + ". &f&l" + person)
            }
            break;
        case "clear":
            for (let i = 0; i < data.whitelist.length; i++ ) {
                data.whitelist.pop();
            }
            saveShitterList(data);
            ChatLib.chat("&b[STyTils] Cleared the blacklist.")
            break;
        default:
            ChatLib.chat("&b[STyTils] USAGE: /whitelist <add/remove/list/clear>")
            break;

    }

}).setName("blacklist")