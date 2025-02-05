export function inDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

export const TIERS = {
    1: 5,
    2: 25,
    3: 100,
    4: 500,
    5: 1500
}

export function canPhase(num) {
    num = Math.abs(num - Math.floor(num));
    return Math.abs(num - 0.137) <= 5e-4 || Math.abs(num - 0.863) <= 5e-4
}