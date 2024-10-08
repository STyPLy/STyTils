import config from "../../config"
// Checks Shitter List on party finder join
register("chat", (ign) => {
    let data = FileLib.read("STyTils","data.json");
    try {
        data = data ? JSON.parse(data) : {};
    } catch(e) {
        if (e) {
            console.log(e);
        }
    }
    if (data[ign.toLowerCase()]) {
        
        setTimeout(()=> {
            let text = config.shitterMessage
            text = text.replace("$ign", ign)
            text = text.replace("$reason",data[ign.toLowerCase()])
            ChatLib.command("pc " + text);
            
        },500);
        
        if (config.autoKick) {
            setTimeout(()=>{
                ChatLib.command("p kick " + ign);
            },1000)
        }
        
    }
}).setCriteria(/^Party Finder > (\S+) joined the dungeon group! \(\w+ Level \d+\)$/)

// Checks for regular party join
register("chat", (rank,ign) => {
    let data = FileLib.read("STyTils","data.json");
    try {
        data = data ? JSON.parse(data) : {};
    } catch(e) {
        if (e) {
            console.log(e);
        }
    }
    if (data[ign.toLowerCase()]) {
        
        setTimeout(()=> {
            let text = config.shitterMessage
            text = text.replace("$ign", ign)
            text = text.replace("$reason",data[ign.toLowerCase()])
            ChatLib.command("pc " + text);
            
        },500);
        if (config.autoKick) {
            setTimeout(()=>{
                ChatLib.command("p kick " + ign);
            },1000)
        }
        
    }
}).setCriteria(/(?:\[(VIP|VIP\+|MVP|MVP\+)\]\s*)?(\w+) joined the party\./)