// Import Features

import "./features/queueCommands"

import './features/Mining/abilityAlert'
import "./features/Counters/slayerCounter"
import './features/shitterList/shitterlist'

import './features/misc/hideProfileID'
import './features/misc/partyHider'
import './features/misc/hideServer'
import './features/misc/autoGift'
import './features/misc/setSpeed'

import './features/dungeons/fireFreeze'
import './features/dungeons/ghostPick'
import './features/dungeons/barPhase'
import './features/dungeons/lavaClip'
import './features/dungeons/bossClip'
import './features/dungeons/refillPearl'
import './features/dungeons/noInteract'
import './features/dungeons/autoWish'
import './features/dungeons/earlyEnter'

import config from "./config"
// Main Command

register("command",()=>{
    config.openGUI()
}).setName("stytils").setAliases("sty")