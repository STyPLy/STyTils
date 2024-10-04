import config from "../config"

let tiers = {
	1: 5,
	2: 25,
	3: 100,
	4: 500,
	5: 1500
}


register("chat", (slayer,level,xp) => {
	if (!config.slayerCounter) return;

	let stripped = xp.split(",").join("")
	let num = Number(stripped)
	let val

	if (config.aatroxBoost) {val = (tiers[config.tier] * 1.25)}
	else val = tiers[config.tier]
	
	if (num) {
		let bosses = Math.ceil(num/val)
		setTimeout(()=> {
			ChatLib.chat("&b[STyTils] " + bosses + " Tier " + config.tier + " " + slayer.toLowerCase() + "'s remaining")
		},500)
	}
}).setCriteria(/\s*(\w+)\s+Slayer\s+LVL\s+(\d+)\s+-\s+Next\s+LVL\s+in\s+([\d,]+)\s+XP!/)
