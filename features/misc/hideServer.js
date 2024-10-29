import config from '../../config'

register("chat",(server,event)=>{
    if (!config.lobbyHider) return;
    cancel(event)
    ChatLib.chat("&7Sending to server &k" + server)
}).setCriteria(/Sending to server (\w+)\.\.\.$/)


register("renderScoreboard",()=>{
    if (!config.lobbyHider) return;
    try {
        let lines = Scoreboard.getLines()
        let index = lines.length
        if (/\d{2}\/\d{2}\/\d{2}/.test(lines[index-1]?.getName().removeFormatting().substring(0,8))) {
            Scoreboard.setLine(index,lines[index-1].getName().substring(0,10),true)
        }
        
    }
    catch (e) {
        // console.log(e)
    }
    
})