import config from '../../config';
import { inDungeon } from '../../utils';

let areas

function inArea(position, area) {
	return position[0] >= area[0] && position[1] >= area[1] && position[2] >= area[2] && position[0] <= area[3] && position[1] <= area[4] && position[2] <= area[5];
}

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
    if (!config.earlyEnterAnounce || !inDungeon()) return;
    if (!areas) return;

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

        ChatLib.command(`pc ${username} is At ${key}`);
        delete areas[key];
    }

})