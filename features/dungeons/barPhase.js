import config from '../../config'
import { canPhase } from '../../utils';

const map = {
    "North": [0,0,-0.706],
    "East": [0.706,0,0],
    "South": [0,0,0.706],
    "West": [-0.706,0,0]
}

const bar = new Block(new BlockType("minecraft:iron_bars"), new BlockPos(123,123,123),null).type.getUnlocalizedName();
const pane = new Block(new BlockType("minecraft:glass_pane"),new BlockPos(-123,-123,-123),null).type.getUnlocalizedName();
const stainedPane = new Block(new BlockType("minecraft:stained_glass_pane"),new BlockPos(123,123,123),null).type.getUnlocalizedName();

const allowed = [bar,pane,stainedPane]

register("tick",()=>{
    if (!config.barPhase) return;
    if (!map[Player.facing()]) return;
    
    let pos = [Player.getX(),Player.getY(),Player.getZ()]
    // Raytraces block in front of you
    let blockpos = Player.getPlayer().func_174822_a(0.5,1)?.func_178782_a()
    if (!blockpos) return
    
    let block = Player.getPlayer().field_70170_p.func_180495_p(blockpos).func_177230_c().func_149739_a()
    let phase = false
    let newPos = pos.map((value,index) => value + map[Player.facing()][index])
    // checks if raytraced block is a iron bar
    if (!allowed.includes(block)) return
    
    phase = pos.some(canPhase)

    if (newPos && phase) {
        Player.getPlayer().func_70107_b(newPos[0],newPos[1],newPos[2])
    }

})


