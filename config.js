const f = FileLib.read("Vigilance", "index.js");
const a = "const isIntegerDesired = attributes.type === PropertyType.SLIDER || attributes.type === PropertyType.SELECTOR;\n";
const b = "const isIntegerDesired = [PropertyType.SLIDER, PropertyType.SELECTOR, PropertyType.NUMBER].includes(attributes.type);\n";
if (f.includes(a)) {
	FileLib.write("Vigilance", "index.js", f.replace(a, b));
	const trigger = register("worldLoad", () => {
		trigger.unregister();
		ChatTriggers.reloadCT();
	});
}

import { Color,@ColorProperty,@SwitchProperty,@SliderProperty,@Vigilant,@TextProperty, @NumberProperty} from '../Vigilance/index';

@Vigilant('STyTils', '§bSTyTils', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Shitter List','Queue Commands', "Counters", "Dungeons", "Random Shit", "Misc"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Config {

    // SHITTER LIST \\

    @SwitchProperty({
        name:"Auto Shitter",
        description: "Adds mfs to shitter list after a certain amount of deaths",
        category: "Shitter List"
    })
    autoShitter = true;

    @SwitchProperty({
        name: "Failed Puzzle",
        description: "Adds mfs to shitter list if they fail a puzzle",
        category: "Shitter List"
    })
    puzzleFail = true

    @SliderProperty({
        name: "Auto Shitter Deaths",
        description: "Amount of deaths required for auto shitter",
        category: "Shitter List",
        min: 1,
        max: 5,
        increment: 1
    })
    deathToShitters = 2;

    @SwitchProperty({
        name:"Auto Kick",
        description: "Kicks mfs on the shitter list.",
        category: "Shitter List"
    })
    autoKick = false;

    @SwitchProperty({
        name: "Join Message",
        description: "Sends a message when a shitter joins",
        category: "Shitter List"
    })
    joinMessage = true

    @TextProperty({
        name: "Shitter Message",
        description: "Message when a shitter joins the party",
        category: "Shitter List",
        placeholder: ""
    })
    shitterMessage = "$ign is TRASH!!"

    @SwitchProperty({
        name: "Scan Parties",
        description: "W.I.P Module: Scans parties you join to check for shitters.",
        category: "Shitter List"
    })
    partyScanner = false

    // QUEUE COMMANDS \\

    @SwitchProperty({
        name:"Queue Commands",
        description: "Queues commands when you join a new lobby.",
        category:"Queue Commands"
    })
    queueCommands = true;

    @TextProperty({
        name: "Queue Command List",
        description: "Commands to queue. Seperate with commas. Reload chat triggers after changing.",
        category: "Queue Commands"
    })
    commandList = ""

    // COUNTERS \\

    @SwitchProperty({
        name: "Slayer Counter",
        description: "Counts how many slayers you have left",
        category: "Counters"
    })
    slayerCounter = false;

    @SwitchProperty({
        name: "Aatrox XP buff",
        description: "Only activate if Aatrox has xp buff perk",
        category: "Counters"
    })
    aatroxBoost = false;

    @SliderProperty({
        name: "Slayer Tier",
        description: "Tier of slayer boss",
        category: "Counters",
        min: 1,
        max: 5,
        increment: 1
    })
    tier = 4;

    // DUNGEONS \\

    @SwitchProperty({
        name: "Fire Freeze Alert (M3)",
        description: "Tells you when to fire freeze for M3. ",
        category: "Dungeons"
    })
    FireFreeze = true

    @SwitchProperty({
        name: "Auto Fire Freeze",
        description: "Use at your own risk.",
        category: "Dungeons"
    })
    autoFreeze = false

    @SwitchProperty({
        name: "Bar Phase",
        description: "Phase through bars",
        category: "Dungeons"
    })
    barPhase = false

    @SwitchProperty({
        name: "Boss Clip",
        description: "Instant enter p2 on f7/m7",
        category: "Dungeons"
    })
    bossClip = false;

    @SwitchProperty({
        name: "Auto Wish",
        description: "Automatically wishes (healer ult) in f7/m7",
        category: "Dungeons"
    })
    autoWish = false;

    @SwitchProperty({
        name: "Auto leap",
        description: "Leaps to an early enter",
        category: "Dungeons"
    })
    autoLeap = false;

    @SwitchProperty({
        name: "Vertical Jerrychine",
        description: "Cancels all x & z motion from jerrychine",
        category: "Dungeons"
    })
    vertJerry = false;


    @SwitchProperty({
        name: "Early Enter Announce",
        description: "Announces when someone is at an Early Enter",
        category: "Dungeons"
    })
    earlyEnterAnounce = false;

    @SwitchProperty({
        name: "Pearl Refill",
        description: "Automatically refills pearls when you run out",
        category: "Dungeons"
    })
    refillPearl = false

    // RANDOM SHIT \\

    @SwitchProperty({
        name: "Set Speed",
        description: "Change your speed attribute.",
        category: "Random Shit"
    })
    setSpeed = false;

    @NumberProperty({
        name: "Speed",
        description: "Speed of Set Speed (doesnt work if best speed is on)",
        category: "Random Shit",
        min: 1,
        max: 515,
        increment: 5
    })
    speed = 400;

    @SwitchProperty({
        name: "Use Best Speed",
        description: "Adds +15 speed to ur current speed (best for wd)",
        category: "Random Shit",
    })
    bestSpeed = true;

    @SwitchProperty({
        name: "No Rotate",
        description: "Cancels server rotations",
        category: "Random Shit"
    })
    noRotate = false;

    @SwitchProperty({
        name: "Keep Motion",
        description: "Keep Motion when getting teleported",
        category: "Random Shit"
    })
    keepMotion = false;

    @SwitchProperty({
        name: "Ignore 0 Pitch",
        description: "basically makes no rotate useless :thumbsup:",
        category: "Random Shit"
    })
    ignorePitch = false;

    @SwitchProperty({
        name: "Omni Sprint",
        description: "Run in all directions",
        category: "Random Shit"
    })
    omniSprint = false;


    @SwitchProperty({
        name: "Auto Gift",
        description: "Automatically open gifts",
        category: "Random Shit"
    })
    autoGift = false;

    @SwitchProperty({
        name: "Ability Alert",
        description: "Alert when ability ready",
        category: "Random Shit"
    })
    abilityAlert = false

    // MISC \\

    @SwitchProperty({
        name: "No Pearl Interact",
        description: "Disables pearl interaction",
        category: "Misc"
    })
    noInteract = false;

    @SwitchProperty({
        name: "Hide Profile ID",
        description: "Hides profile ID on world load.",
        category: "Misc"
    })
    hideID = false;

    @SwitchProperty({
        name: "Hide Lobby ID's",
        description: "Hides scoreboard and chat lobby ID's",
        category: "Misc"
    })
    lobbyHider = false

    @SwitchProperty({
        name: "Party Hider",
        description: "Hides the usernames of players on the list",
        category: "Misc"
    })
    partyHider = false;

    @TextProperty({
        name: "Party Hider List",
        description: "Enter player names you want to hide, seperate with commas",
        category: "Misc"
    })
    team = "";


    constructor() {
        this.initialize(this);
        this.addDependency("Auto Shitter Deaths","Auto Shitter")
        this.addDependency("Failed Puzzle", "Auto Shitter")
        
        this.addDependency("Shitter Message", "Join Message")

        this.addDependency("Aatrox XP buff", "Slayer Counter")

        this.addDependency("Queue Command List", "Queue Commands")

        this.addDependency("Auto Fire Freeze", "Fire Freeze Alert (M3)")

        this.addDependency("Speed", "Set Speed")

        this.addDependency("Keep Motion", "No Rotate")
        this.addDependency("Ignore 0 Pitch", "No Rotate")
    }

}

export default new Config();