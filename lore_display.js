const NEW_LORE_LIST = [
  '0 Wow, an abandoned starfighter.  I wonder what would happen if I got in this thing?  Maybe I\'m an Epic Starfighter Pilot and this is my legacy?', //asign a skill
  '1 Hmm, maybe it needs some fixing.  Maybe I can work on the systems and weapons and give it some capacity and firepower.  Then we\'re flying!', //cap = 1 power =2 
  '2 Cool, this thing can do some things now!  Let\'s practice piloting this thing and git gud. Maybe we\'re ready for some serious Starfighting?', // total skill = 15
  '3 OK, this hunk of junk is only getting so far.  I think it might be time to go back to the drawing board and Retrofit our starfighter.', // retrofit
  '4 Well, I guess we used the original parts to start up a fleet or something.  We should Retrofit our ' + firstType() + ', and get fit for starfight.', // retrofit both
  '5 Nifty.  This fleet and all these new weapons and systems are really awesome.  But we\'re a long ways from Settling a Space War.  Build our fleet up.', // fleet cap = 5, power = 20
  '6 This fleet and all these new weapons and systems are really awesome, but to really harness everything at my disposal, it\'s time for me to lead.', // leader = 1
  '7 Wow, Leadership has its benefits.  I\'m all boosted and, so is everything.  I will keep working on my Leadership and take it to the next level. SEGA', // leader = 5
  '8 Victory is within reach!  Soon, we can settle the first war and begin our Epic Starfighter Pilot Legacy.  Legacy screen opening up soon, near you.', // settle war
  '9 With our Legacy we can dedicate ourselves: Resolve, the drive get things done; Resonance, the ability to lead; and Resource; the ability to source.', // one point in each legacy
  '10 Our Legacy is starting to take shape and soon we will be winning wars regularly.  Power through more wars and gain experience towards your legacy', // get autopilot
  '11 Oh jee, ooooooootto pilot.  Game changer.  So now that we\'re winning wars, how fast can we win a war?  Can we do 5 hours in an hour?  Starfight!', // space war in an hour
  '12 On the flip side, if I fight longer wars, there will be bigger stories written, and with bigger stories, comes more legacy.  More legacy = more upgrades.', // 2 legacy points
  '13 All this legacy building makes me realize the potential I have.  There are some goals I should commit myself to if I want to truly be a galactic hero', //all legacy upgrades
  '14 Time to start proving myself.  It\'s time to go out and show the galaxy that I am the Epic Starfighter Pilot and this is my destiny.  My Legacy.', //space war in a minute
  '15 Not bad!  I bet I can win a space war without being a leader, just on cool alone.  Well, with my fleet and my starfighter to back me up.', // space war without becoming a leader
  '16 The biggest fights rage on beyond just a simple skirmish.  If I prove I can fight for the long haul, then maybe I can take on some serious missions. ', // starfight for a day
  '17 Clicky clicky, I\'m the fastest draw in the galaxy.  The reach of my empire is vast and I can crush my enemies in a second. ', // space war in a second
  '18 A true leader is needed to conquer the galaxy.  As I reach accolade after accolate, I can\'t help but wonder where this journey will take us.', // leader up = 20 ?
  '19 Holy hanna, we\'re really doing this.  I\'m taking the crew on a wild ride through Inner Space,', //space war in inner soulo 
  '20 MISSION UNLOCKED - Everyone is burned out and everything is a real slog.', //complete 12 missions
  '21 MISSION UNLOCKED - Times are tough, and your legacy doesn\'t have the impact it used to.', //complete 20 missions
  '22 MISSION UNLOCKED - Times are really tough.  Your Legacy is tarnished and you have only your close friends.', //settle a war with zero skill
  '23 Wow, you are finally starting to understand those Alien upgrades now. That wasn\'t too bad.', //make provenance
  '24 Maybe you spoke too soon. You\'ve kept working on those Alien Upgrades and now you\'re getting some "Prominance"', //have 33.33 pre-eminence
  '25 You have enough Prominance for now.', // leader up = 40
  '26 You are an extremely enlightened Leader, but it doesn\'t actually seem to be helping to Starfigth that much.', //billion skill
  '27 There are a lot of people occupied in this star war.  You wonder if anyone isn\'t?',  // 1e308 legacy points in one war
  '28 You\'re now renowned as the best starfighter in the galaxy!', // all normal achievements
  '29 Not only are you best the starfighter in the galaxy, but you\'ve done everything everyone could expect of you and then some,', // 10 space wars e308 bigger than previous
  '30 You\'re pretty much the best... ever.  There\'s not much left to do... if you even want to.', // gain 4383:00:00 in one retrofit
  '31 People continue to meet you and are inspired by you.  Who knows, maybe they\'ll become legacies in their own time.',  // get 10x leadership boost
  '32 You remember when you first got in your starfighter, won your first war, and began your journey across the galaxy', // complete 42 missions
  '33 You remember when you first got in your starfighter, won your first war, and began your journey across the galaxy', // Trillion Provenance
  '34 You remember when you first got in your starfighter, won your first war, and began your journey across the galaxy', // Leader up = 80
  '35 ', // trillion skill
  '36 How long are things worth fighting over, you wonder.  You realize that your ideals are worth fighting for, no matter how many long it takes', // 17532:00:00 space war
];

const LORE_LIST = [
  '0 Wow, someone abandoned this really basic starfighter here... on this desert planet',
  '1 Hmm maybe it needs some fixing up.  Maybe with some Systems and Weapons, be,',
  '2 Beep Boop.  Reeeee.  Feels like you\'re figuring out the controls.  Keep practicing.',
  '3 You might actually be getting good at flying.  Keep practicing.',
  '4 You are getting more skilled!  Maybe you\'ll be a real Starfighter Pilot some day.',
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
  document.getElementById('lore-div').innerHTML = loreShown.join('<br/>');
  document.getElementById('lore_goal').innerHTML = loreShown.join('<br/>');
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


function firstType() {
  return 'Weapons'
}
