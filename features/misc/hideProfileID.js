import config from "../../config"

register("chat", (event)=> {
    if (!config.hideID) return
    cancel(event)
}).setCriteria(/Profile ID: [0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/)