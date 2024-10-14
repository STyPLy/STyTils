import { Color,@ColorProperty,@SwitchProperty,@SliderProperty,@Vigilant,@TextProperty} from '../Vigilance/index';

@Vigilant('STyTils', '§bSTyTils', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Shitter List','Queue Commands', "Counters", "Misc"];
        return 1
    }
})
class Config {
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

    @TextProperty({
        name: "Shitter Join Message",
        description: "Message when a shitter joins the party",
        category: "Shitter List",
        placeholder: ""
    })
    shitterMessage = "$ign is TRASH!!"

    @SwitchProperty({
        name:"Queue Commands",
        description: "Queues commands when you join a new lobby.",
        category:"Queue Commands"
    })
    queueCommands = true;

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

    @SwitchProperty({
        name: "Hide Profile ID",
        description: "Hides profile ID on world load.",
        category: "Misc"
    })
    hideID = false;

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
        this.addDependency("Aatrox XP buff", "Slayer Counter")
    }

}

export default new Config();