import config from '../../config'
const map = {
    "North": [0,0,0.706],
    "East": [0.706,0,0],
    "South": [0,0,-0.706],
    "West": [-0.706,0,0]
}

const bar = new Block(new BlockType("minecraft:iron_bars"), new BlockPos(123,123,123));

function canPhase(num) {
    num = Math.abs(num - Math.floor(num));
    if (num == 0.137 || num == 0.863) return true
    return false;
}

register("tick",()=>{
    if (!config.barPhase) return;
    if (!map[Player.facing()]) return;

    let pos = [Player.getX(),Player.getY(),Player.getZ()]
    let blockpos = Player.getPlayer().func_174822_a(1,1)?.func_178782_a()
    let block = Player.getPlayer().field_70170_p?.func_180495_p(blockpos).func_177230_c().func_149739_a()
    let phase = false
    let newPos = pos.map((value,index) => value + map[Player.facing()])

    if (block != bar) return
    
    
    phase = pos.some(canPhase)
    
    
    if (newPos && phase) {
        Player.getPlayer().func_70107_b(...newPos)
    }

})

