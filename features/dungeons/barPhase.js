import config from '../../config'
const map = {
    "North": [0,0,0.706],
    "East": [0.706,0,0],
    "South": [0,0,-0.706],
    "West": [-0.706,0,0]
}

const bar = new Block(new BlockType("minecraft:iron_bars"), new BlockPos(123,123,123),null).type.getUnlocalizedName();

// Checks if you are able to phase
function canPhase(num) {
    num = Math.abs(num - Math.floor(num));
    return Math.abs(num - 0.137) <= 5e-4 || Math.abs(num - 0.863) <= 5e-4
}

register("tick",()=>{
    if (!config.barPhase) return;
    if (!map[Player.facing()]) return;
    
    let pos = [Player.getX(),Player.getY(),Player.getZ()]
    // Raytraces block in front of you
    let blockpos = Player.getPlayer().func_174822_a(1,1)?.func_178782_a()
    if (!blockpos) return
    
    let block = Player.getPlayer().field_70170_p.func_180495_p(blockpos).func_177230_c().func_149739_a()
    let phase = false
    let newPos = pos.map((value,index) => value + map[Player.facing()][index])
    // checks if raytraced block is a iron bar
    if (block != bar) return
    
    phase = pos.some(canPhase)

    if (newPos && phase) {
        Player.getPlayer().func_70107_b(newPos[0],newPos[1],newPos[2])
    }

})


