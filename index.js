// Import Features
import "./features/deathTracker"
import "./features/partyJoin"
import "./features/queueCommands"
import "./features/slayerCounter"
import './features/shitterlist'

import config from "./config"
// Main Command

register("command",()=>{
    config.openGUI()
}).setName("stytils").setAliases("sty")
