export function inDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

export const TIERS = {
    1: 5,
    2: 25,
    3: 100,
    4: 500,
    5: 1500
}

export function canPhase(num) {
    num = Math.abs(num - Math.floor(num));
    return Math.abs(num - 0.137) <= 5e-4 || Math.abs(num - 0.863) <= 5e-4
}

export function getShitterList() {
    let data = FileLib.read("STyTils","data.json")
    try {
        data = data ? JSON.parse(data) : {shitters: {}, whitelist: []};
    } catch (e) {
        console.log(e);
    }
    return data;
}

export function saveShitterList(data) {
    try {
        FileLib.write("STyTils", "data.json", JSON.stringify(data,null,4),true)
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return true
}

export function getKeybind(keyName) {
    try {
        let File = Java.type("java.io.File")
        let mc = new File(Client.getMinecraft().field_71412_D.getPath())
        let data = FileLib.read(`${mc}\\options.txt`).split("\n");
        for (let i = 0; i < data.length; i++) {
            if (data[i].includes(keyName)) {
                return data[i].split(":")[1]
            }
        }
        return 0;
    }
    catch (e) {
        console.log(e)
    }
}

export function rightClick() {
    let rc = Client.getMinecraft().class.getDeclaredMethod('func_147121_ag')
    rc.setAccessible(true)
    Client.scheduleTask(0,()=>{
        rc.invoke(Client.getMinecraft())
    })
}

/*
takes ct player object
returns class shit
*/
export function getClass(player) {

    let tab = TabList.getNames()
    for (let i = 0; i < tab.length; i++) {
        let line = tab[i]?.removeFormatting()


        if (line.includes(player?.getName())) {
            return line.substring((line.indexOf("(")) + 1)
        }
    }
}

export function nameToEntity(username) {
    let players = World.getAllPlayers();

    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        if (player?.name == username) return player;
    }

   return null;
}