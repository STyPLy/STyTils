import config from '../../config';
import { inDungeon } from '../../utils';

const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")
const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow");
const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
const S08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");
const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow");

let areas
let earlyEnter

function inArea(position, area) {
	return position[0] >= area[0] && position[1] >= area[1] && position[2] >= area[2] && position[0] <= area[3] && position[1] <= area[4] && position[2] <= area[5];
}

function leapToEarlyEnter() {
    if (Player.getContainer()?.size !== 45) {
        Client.scheduleTask(0,()=>{
            Client.sendPacket(new C0DPacketCloseWindow(Player.getContainer().getWindowId()));
        })
        return;
    };
    
    // Find Leap
    let inventory = Player.getInventory().getItems()
    let leap = false
    let leapIndex
    inventory.forEach((item,index)=>{
        if (item?.getName()?.toLowerCase()?.includes("leap") && index < 9 && index > -1) {
            leap = true;
            leapIndex = index
            return;
        }
    })
    if (!leap) return;
    
    Player.setHeldItemIndex(leapIndex);
    
    Client.scheduleTask(2,()=>{
        let itemStack = Client.getMinecraft().field_71439_g.func_70694_bm();
        Client.sendPacket(new S08PacketPlayerBlockPlacement(itemStack));
    })
    
    
    // Wait for menu to open
    let awaitPacket = register("packetReceived",(packet,event)=>{

        // Hide leap menu
        cancel(event)

        // Check if correct menu
        if (!packet.func_179840_c().func_150254_d().removeFormatting().includes("Spirit Leap")) return awaitPacket.unregister();
        
        let windowId = packet.func_148901_c();
        let slotRegister = register("packetReceived",(packet, event)=>{
            let itemStack = packet.func_149174_e().func_82833_r()
            if (itemStack.includes(earlyEnter)) {
                let slot = packet.func_149173_d();

                setTimeout(()=>{
                    Client.sendPacket(new C0EPacketClickWindow(windowId,slot,0,0,null,0))
                },350)
                slotRegister.unregister();
                
            }
        }).setFilteredClass(S2FPacketSetSlot)
        
        

        awaitPacket.unregister()
    }).setFilteredClass(S2DPacketOpenWindow)


    // awaitPacket timeout
    Client.scheduleTask(100,()=>{
        awaitPacket?.unregister();
    })

    
}


let trigger = register("packetReceived",(packet,event)=>{
    if (packet.func_148916_d() || !inDungeon()) return;
    
    const chatComponent = packet.func_148915_c();
    const formatted = chatComponent.func_150254_d().removeFormatting();

    let match = formatted.match(/^.+? activated a (?:lever|terminal)! \((\d)\/(\d)\)/);
    if (!match) return;

    let termCompleted = match[1];
    let maxTerm = match[2];

    if (termCompleted === maxTerm) {
        leapToEarlyEnter();
        trigger.unregister();
    } 
    
}).setFilteredClass(S02PacketChat).unregister();

register("worldLoad",()=>{
    areas = {
        "SS": [107,120,93,110,120,94],
        "Early Enter 2": [55,107,129,60,110,133],
        "Early Enter 3": [0,108,102,3,112,106],
        "Early Enter 4": [50,113,50,58,117,54],
        "Core": [49,111,55,60,118,60]
    }
})

register("tick",()=>{
    if (!areas || !inDungeon()) return;
    if (!config.earlyEnterAnounce && !config.autoLeap) return;

    let players = World.getAllPlayers();
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const username = player?.name;
        if (username == Player.getName() || username?.split(" ")?.length > 1 || !username) continue;

        const pos = [player?.x, player?.y, player?.z];

        if (pos[0] === undefined || pos[1] === undefined || pos[2] === undefined) continue;

        const playerAreaEntry = Object.entries(areas).find(
            ([key, volume]) => inArea(pos, volume)
        );

        if (!playerAreaEntry) continue;
        const [key] = playerAreaEntry;

        if (config.earlyEnterAnounce) ChatLib.command(`pc ${username} is At ${key}`);
        
        earlyEnter = username;
        delete areas[key];

        if (!config.autoLeap) return;

        if (key.includes("Early Enter"))
            trigger.register();
    }

})