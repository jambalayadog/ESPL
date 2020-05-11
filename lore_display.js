const LORE_LIST = [
  '0 Wow, someone just left this abandoned starfighter sitting around.',
  '1 You take it for a spin.  It flies.',
  '2 Feels like you have been flying this thing for ages',
  '3 You might actually be getting good at flying.',
  '4 You are getting more skilled!',
  '5 Your weapons investments are paying off. You\'re now 20% more weapon proficient.',
  '6 Better systems and handling will help us pilot this ship even better.',
  '7 Hmm maybe I can build more ships and build a new ship for myself.',
  '8 Maybe if I had more Cool, it would be enough to win this war.',
  '9 Not enough to be Cool... maybe I need to invest in Leadership.',
  '10 You are a natural leader, which makes your Cool cooler... but you will lose your cool when you retrofit your fleet.',
  '11 You finally won a space war!  Time to build your Starfighter Pilot Legacy!',
  '12 Your wars are getting bigger, and your starting to get more Legacy for bigger wars!',
  '13 Your Legacy is growing!  Can you fight for 24 hours?  (Unlocks Missions)',
  '14 MISSION UNLOCKED - for this mission, you are going to use Alien Technology.  It\'s hard.',
  '15 MISSION UNLOCKED - ever been stuck in space without weapons?  This is one of those times.',
  '16 MISSION UNLOCKED - ever been stuck in space without ships?  This is one of those times.',
  '17 MISSION UNLOCKED - who needs to be stranged without weapons or ships?  Time to go it alone!',
  '18 MISSION UNLOCKED - maybe not so alone, but now the crew is mad and no one wants Leadership!',
  '19 MISSION UNLOCKED - You decide to teach your crew a lesson and get the mission done without Retrofits.',
  '20 MISSION UNLOCKED - Everyone is burned out and everything is a real slog.',
  '21 MISSION UNLOCKED - Times are tough, and your legacy doesn\'t have the impact it used to.',
  '22 MISSION UNLOCKED - Times are really tough.  Your Legacy is tarnished and you have only your close friends.',
  '23 Wow, you are finally starting to understand those Alien upgrades now. That wasn\'t too bad.',
  '24 Maybe you spoke too soon. You\'ve kept working on those Alien Upgrades and now you\'re getting some "Prominance"',
  '25 You have enough Prominance for now.',
  '26 You are an extremely enlightened Leader, but it doesn\'t actually seem to be helping to Starfigth that much.',
  '27 There are a lot of people occupied in this star war.  You wonder if anyone isn\'t?',
  '28 You\'re now renowned as the best starfighter in the galaxy!',
  '29 Not only are you best the starfighter in the galaxy, but you\'ve done everything everyone could expect of you and then some,',
  '30 You\'re pretty much the best... ever.  There\'s not much left to do... if you even want to.',
  '31 People continue to meet you and are inspired by you.  Who knows, maybe they\'ll become legacies in their own time.',
  '32 You remember when you first got in your starfighter, won your first war, and began your journey across the galaxy'
];

function updateLoreDisplay() {
  let loreShown = LORE_LIST.map((lore, i) => (player.lore.indexOf(i) === -1) ? '' : lore);
  while (loreShown[loreShown.length - 1] === '') {
    loreShown.pop();
  }
  document.getElementById('lore-div').innerHTML = loreShown.join('<br/>') + '<hr/>';
  document.getElementById('lore_goal').innerHTML = loreShown.join('<br/>') + '<hr/>';
}

/*
loreDisplay = [];
for ( const lore of LORE_LIST ) {
  console.log("Lore = ", lore)
  console.log("Lore display = ", loreDisplay)
  console.log("Lore List 15 = ", LORE_LIST[15])
  console.log("Player Lore = ", player.lore)
  document.getElementById('lore_goal').innerHTML = loreDisplay.join('<br/>') + lore;
  console.log(lore)
  console.log(loreDisplay)
}*/



