// Import Features

import "./features/queueCommands"

import "./features/Counters/slayerCounter"
import './features/shitterList/shitterlist'

import './features/misc/hideProfileID'
import './features/misc/partyHider'
import './features/misc/hideServer'

import './features/dungeons/fireFreeze'
import './features/dungeons/ghostPick'
import './features/dungeons/barPhase'

import config from "./config"
// Main Command

register("command",()=>{
    config.openGUI()
}).setName("stytils").setAliases("sty")
