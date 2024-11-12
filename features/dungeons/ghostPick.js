const air = new Block(new BlockType("minecraft:air"), new BlockPos(999, 999, 999), null).type
const chest = new Block(new BlockType("minecraft:chest"), new BlockPos(999,999,999),null).type
const lever = new Block(new BlockType("minecraft:lever"), new BlockPos(999,999,999),null).type
const tchest = new Block(new BlockType("minecraft:trapped_chest"), new BlockPos(999,999,999),null).type
let db = false

let disallowed = [air.getUnlocalizedName(),chest.getUnlocalizedName(),lever.getUnlocalizedName(),tchest.getUnlocalizedName()]

new KeyBind("Ghost Block",Keyboard.KEY_NONE,"STyTils").registerKeyDown(()=>{
    
    if (!db) db = true
    else return;
    setTimeout(()=>{
        db = false
    },50)
    const mc = Client.getMinecraft()
    let blockpos = Player.getPlayer().func_174822_a(6,1).func_178782_a()
    
    
    let block = Player.getPlayer().field_70170_p.func_180495_p(blockpos).func_177230_c().func_149739_a()
    if (disallowed.includes(block)) return;

    Player.getPlayer().func_71038_i()
    mc.field_71441_e.func_175656_a(blockpos,air.getDefaultState())
    
})