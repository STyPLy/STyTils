Client.settings.getSettings().func_74300_a(); // loads keybinds TOP OF FILE
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
import './features/dungeons/lavaClip'
import './features/dungeons/bossClip'

import config from "./config"
// Main Command

register("command",()=>{
    config.openGUI()
}).setName("stytils").setAliases("sty")


register('gameUnload', () => {
    Client.settings.getSettings().func_74303_b(); // saves keybinds
})