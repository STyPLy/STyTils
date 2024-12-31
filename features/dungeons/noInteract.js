import config from "../../config"

register("playerInteract", (action, _, event) => {
	if (!config.noInteract) return;
    if (action.toString() != "RIGHT_CLICK_BLOCK") return;
    if (Player?.getHeldItem()?.getName()?.includes("Ender Pearl")) cancel(event);
})