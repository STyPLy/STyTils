// Import Features

import "./features/queueCommands"
import "./features/Counters/slayerCounter"
import './features/shitterList/shitterlist'
import './features/misc/hideProfileID'

import config from "./config"
// Main Command

register("command",()=>{
    config.openGUI()
}).setName("stytils").setAliases("sty")
