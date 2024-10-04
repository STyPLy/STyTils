
register("command", (command, ign) => {
    if (!command) {ChatLib.chat("&b[SL] USAGE: /sl <add/remove> <username>"); return};
    let data = FileLib.read("STyTils","data.json")
    try {
        data = data ? JSON.parse(data) : {};
    } catch (e) {
        console.log(e);
    }
    // if (!data) ChatLib.chat("&cCould not read data.json ?");
    switch (command) {
        case "add":
            if (data[ign.toLowerCase()]) {ChatLib.chat(ign + " is already on the shitter list."); return}
            data[ign.toLowerCase()] = true;
            FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true)
            ChatLib.chat("&b[SL] Added " + ign + " to the shitter list.")
            break;
        case "remove":
            if (!data[ign.toLowerCase()]) {ChatLib.chat("&b[SL] " + ign + " is not on the shitter list."); return;}
            delete data[ign.toLowerCase()]
            FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true)
            ChatLib.chat("&b[SL] Removed " + ign + " from the shitter list.")
            break;
        case "list":
            ChatLib.chat("&bShitter List: ")
            Object.keys(data).forEach(key => ChatLib.chat("&b" + key));
            break;
        case "clear":
            Object.keys(data).forEach(key => {
                delete data[key]
            })
            FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true)
            ChatLib.chat("&b[SL] Cleared the shitter list.")
            break;
        default:   
            ChatLib.chat("&b[SL] USAGE: /sl <add/remove> <username>");
            break;
    }
    
    
}).setName("shitter").setAliases("sl","shitterlist");