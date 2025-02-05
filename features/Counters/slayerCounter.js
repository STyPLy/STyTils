import config from "../../config"
import { TIERS } from "../../utils";



register("chat", (slayer,level,xp) => {
	if (!config.slayerCounter) return;

	let stripped = xp.split(",").join("")
	let num = Number(stripped)
	let val

	if (config.aatroxBoost) {val = (TIERS[config.tier] * 1.25)}
	else val = TIERS[config.tier]
	
	if (num) {
		let bosses = Math.ceil(num/val)
		setTimeout(()=> {
			ChatLib.chat("&b[STyTils] " + bosses + " Tier " + config.tier + " " + slayer.toUpperCase() + "'s remaining")
		},500)
	}
}).setCriteria(/\s*(\w+)\s+Slayer\s+LVL\s+(\d+)\s+-\s+Next\s+LVL\s+in\s+([\d,]+)\s+XP!/)
