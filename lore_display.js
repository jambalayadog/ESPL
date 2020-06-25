const NEW_LORE_LIST = [
  '0 Wow, an abandoned starfighter.  I wonder what would happen if I got in this thing?  Maybe I\'m an Epic Starfighter Pilot and this is my legacy?', //asign a skill
  '1 Hmm, maybe it needs some fixing.  Maybe I can work on the systems and weapons and give it some capacity and firepower.  Then we\'re flying!', //cap = 1 power =2 
  '2 Cool, this thing can do some things now!  Let\'s practice piloting this thing and git gud. Maybe we\'re ready for some serious Starfighting?', // total skill = 15
  '3 OK, this hunk of junk is only getting so far.  I think it might be time to go back to the drawing board and Retrofit our starfighter.', // retrofit
  '4 Well, I guess we used the original parts to start up a Armada or something.  We should Retrofit our ship frequently and get ready to starfight.', // retrofit both
  '5 Nifty.  This Armada and all these new weapons and systems are really awesome.  But we\'re a long ways from Settling a Space War.  Build our Armada up.', // Armada cap = 5, power = 20
  '6 This Armada and all these new weapons and systems are really awesome, but to really harness everything at my disposal, it\'s time for me to lead.', // leader = 1
  '7 Wow, Leadership has its benefits.  I\'m all boosted and, so is everything.  I will keep working on my Leadership and take it to the next level. SEGA', // leader = 5
  '8 Victory is within reach!  Soon, we can settle the first war and begin our Epic Starfighter Pilot Legacy.  Legacy screen opening up soon, near you.', // settle war
  '9 With our Legacy we can dedicate ourselves: Resolve, the drive get things done; Resonance, the ability to lead; and Resource; the ability to source.', // one point in each legacy
  '10 Our Legacy is starting to take shape and soon we will be winning wars regularly.  Power through more wars and gain experience towards your legacy', // get autopilot
  '11 Oh jee, ooooooootto pilot.  Game changer.  So now that we\'re winning wars, how fast can we win a war?  Can we do 5 hours in an hour?  Starfight!', // space war in an hour
  '12 On the flip side, if I fight longer wars, there will be bigger stories written, and with bigger stories, comes more legacy.  More legacy = more upgrades.', // 2 legacy points
  '13 All this legacy building makes me realize the potential I have.  There are some goals I should commit myself to if I want to truly be a galactic hero', //all legacy upgrades
  '14 Time to start proving myself.  It\'s time to go out and show the galaxy that I am the Epic Starfighter Pilot and this is my destiny.  My Legacy.', //space war in a minute
  '15 Not bad!  I bet I can win a space war without being a leader, just on cool alone.  Well, with my Armada and my starfighter to back me up.', // space war without becoming a leader
  '16 The biggest fights rage on beyond just a simple skirmish.  If I prove I can fight for the long haul, then maybe I can take on some serious missions. ', // starfight for a day
  '17 A true leader is needed to conquer the galaxy.  As I reach accolade after accolate, I can\'t help but wonder where this journey will take us.', // leader up = 20 ?
  '18 I can\'t help but feel that there\'s something great out there, and I have to do some soul searching.  This will help me develop my leadership skils.', //space war in inner soulo 
  '19 I feel it\'s time to grow our legend around the galaxy and take on these missions.  Enduring these hardships will teach us a lot about efficiency. ', //complete 12 missions
  '20 Yes, this is working.  As we\'re completing these missions, we are learning much about ourselves and opening up more avenues to get stronger.', //complete 20 missions
  '21 Well, now I\'m curious.  Can I Settle a War without any skill?  Can I rely on my Armadas and Leadership alone?', //settle a war with zero skill
  '22 I am drawn to a mysterious belief that I\'m special.  I think if I spend time searching my Inner Soulo, I\'ll discover what\'s so special about me.', //make provenance
  '23 Wow, turns out I am special.  I seem to have some pre-natural ability.  I wonder what it does?  I think I will have to continue my journey.', //have 33.33 pre-eminence
  '24 That really is something.  Time is going faster now, that or I can do more with my time?  I\'m not really sure, but it\'s time to lead.', // leader up = 40
  '25 1e9, that\'s a billion, right?  Is there anyone that\'s got a billion skill points?  Do people even consider themselves as having skill points?', //billion skill
  '26 How big of a war can I get into?  I think web numbers usually break around 1e308, so let\'s get that many legacy points and see what happens.',  // 1e308 legacy points in one war
  '27 Oh I did it!   This one\'s a freebie!  I\'ve completed all the Journey Objectives.  Now on to the Master Objectives.  Oh gosh, this may be a while.', // all normal achievements
  '28 I bet with a good star war plan, I can orchestrate a chain of wars, each larger than the last. Call me crazy but I think my operations are strong.', // 10 space wars e308 bigger than previous
  '29 It is my destiny to build the largest Armada that the galaxy has ever seen!  I will set about and build a supreme Armada to awe all those who oppose.', // gain 4383:00:00 in one retrofit
  '30 The only way to truly lead, is to lead for a long time.  Everyday leaders come and go, but true Leadership stands the test of time.',  // get 10x leadership boost
  '31 The answer to life, the universe, and everything.  I will have truly endured if I can say I\'ve bested all the challenges in my life, and then some.', // complete 42 missions
  '32 I can feel that I\'m almost there, but there is yet still so much to learn about about my lineage within the origins of the universe.', // Trillion Provenance
  '33 What rank do you get when you\'re already the highest rank possible?  Make up a new one?  Grand Leader Of Everything?  Ruler Of The Universe?', // Leader up = 80
  '34 1e12, that\'s a trillion, right?  Is there anyone that\'s got a trillion skill points?  I bet it won\'t even take my that long to train myself.', // trillion skill
  '35 How long are things worth fighting over, you wonder.  You realize that your ideals are worth fighting for, no matter how many long it takes', // 17532:00:00 space war
];

//   '17 Clicky clicky, I\'m the fastest draw in the galaxy.  The reach of my empire is vast and I can crush my enemies in a second. ', // space war in a second

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
  '10 You are a natural leader, which makes your Cool cooler... but you will lose your cool when you retrofit your Armada.',
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
  let loreShown = NEW_LORE_LIST.map((lore, i) => (player.lore.indexOf(i) === -1) ? '' : lore);
  while (loreShown[loreShown.length - 1] === '') {
    loreShown.pop();
  }
  //document.getElementById('lore-div').innerHTML = loreShown.join('<br/>');
  document.getElementById('lore_goal').innerHTML = loreShown.join('<br/>');
  document.getElementById('lore_goal2').innerHTML = loreShown.join('<br/>')
}

