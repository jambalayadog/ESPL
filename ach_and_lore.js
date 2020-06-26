function getNormalAchievementsEffect() {
  return Math.pow(1.1, player.achievements.normal.number);
}

function getNormalAchievementsPatienceEffect() {
  return Math.pow(1.01, player.achievements.normal.number);
}

function getNormalAchievementsPatienceKeptEffect() {
  return 0.01 * player.achievements.normal.number;
}

function getLategameAchievementsPatienceEffect() {
  return Math.pow(1.1, player.achievements.lategame.number);
}

function getLategameAchievementsCompletionsEffect() {
  return Math.pow(1.01, player.achievements.lategame.number);
}

function getLategameAchievementsPatienceKeptEffect() {
  return 0.01 * player.achievements.lategame.number;
}

function giveNormalAchievement(i) {
  if (!player.achievements.normal.list[i]) {
    player.achievements.normal.list[i] = true;
    player.achievements.normal.number++;
    updateAchievementDisplay();
  }
}

function giveLategameAchievement(i) {
  if (!player.achievements.lategame.list[i]) {
    player.achievements.lategame.list[i] = true;
    player.achievements.lategame.number++;
    updateAchievementDisplay();
  }
}

function giveLore(i) {
  if (player.lore.indexOf(i) === -1) {
    player.lore.push(i);
    updateLoreDisplay();
  }
}

function givePrestigeAchievementsAndLore(i, oldProgress) {
  let retrofitOffset = 0;
  if (getEffect(5) > 1 && player.firstRetrofit != 'Weapons') {
    giveNormalAchievement(3+retrofitOffset);  //retrofit
    giveLore(4+retrofitOffset);
    retrofitOffset += 1;
    player.firstRetrofit = 'Weapons';
  }
  if (getEffect(6) > 0 && player.firstRetrofit != 'Systems') {  //retrofit 2nd
    giveNormalAchievement(3+retrofitOffset);
    giveLore(4+retrofitOffset);
    retrofitOffset += 1;
    player.firstRetrofit = 'Systems';
  }

  /*if (player.progress[i] - oldProgress >= 3600) {   //1 hour
    giveNormalAchievement(6);
  }*/
  if (player.progress[i] - oldProgress >= 15778800) {  //retrofit 4383:00:00
    giveLategameAchievement(2);
    giveLore(30);
  }
}

function giveUpdateAchievementsAndLore(now, gain, oldChallenge) {
  giveNormalAchievement(8);  //settled first war
  giveLore(9);
  if (now - player.stats.last.update <= 3600000) {  //settle war in 1 hour  (3600000 microseconds)
    giveNormalAchievement(11);
    giveLore(12)
  }
  if (gain.gte(2)) {  //2 legacy points
    giveNormalAchievement(12);
    giveLore(13);
  }
  if (now - player.stats.last.update <= 60000) {  // settle war in 1 minute
    giveNormalAchievement(14);
    giveLore(15);
  }
  if (player.achievements.stats.savingTokens) {  // settle war without becoming a leader
    giveNormalAchievement(15);
    giveLore(16)
  }
  /*if (now - player.stats.last.update <= 1000) {  // settle war in 1 second

  }*/
  if (oldChallenge === 'logarithmic') {  // settle war in Inner Soulo (does this work?)
    giveNormalAchievement(18);
    giveLore(19);
  }
  if (player.achievements.stats.noDevsForThat) {  // settle war with no skill
    giveNormalAchievement(21);
    giveLore(22);
  }
  if (gain.gte(Number.MAX_VALUE)) {  // settle war for 1e308
    giveNormalAchievement(26);
    giveLore(27);
  }
  // Include "previous updates"
  if (gain.gte(player.stats.last.updatePointGain.times(Number.MAX_VALUE)) && gain.gt(0)) {  //1e308 greater 10 times in a row
    player.achievements.stats.yoDawg++;
    if (player.achievements.stats.yoDawg >= 10) {
      giveLategameAchievement(1);
      giveLore(29);
    }
  } else {
    player.achievements.stats.yoDawg = 0;
  }
}

function checkForSpecificAchievement(x) {
  return player.achievements.normal.list[x];
}

function checkForAchievementsAndLore() {
  let progress = player.progress.slice(0, 5);
  let devs = player.devs.slice(0, 5);
  let loreFarthest = Math.max(
    Math.max.apply(null, progress), player.stats.recordDevelopment['']);
  giveLore(0);
  if (devs.some(i => i !== 0)) {   // assigned a skill
    giveNormalAchievement(0);   
    giveLore(1);
  }
  if (getEffect(2) >= 1 && getEffect(1) >= 2) {  //cap = 1, power = 2
    giveNormalAchievement(1);
    giveLore(2);
  }
  if (getEffect(3) >= 15) {  //total skill = 15
    giveNormalAchievement(2);
    giveLore(3);
  }
  if (getEffect(6) >= 5 && getEffect(5) >= 20) {  //cap = 5, power = 20
    giveNormalAchievement(5);
    giveLore(6);
  }
  if (getTotalEnlightened() >= 1) {   // leader rank 1
    giveNormalAchievement(6);
    giveLore(7);
  }
  if (getTotalEnlightened() >= 5) {   // leader rank 5
    giveNormalAchievement(7);
    giveLore(8);
  }
  if (updateUpgradeActive(0, 2)) { // unlocked autopilot
    giveNormalAchievement(10);
    giveLore(11);
  }
  if (getTotalEnlightened() >= 20) {   // leader rank 20
    giveNormalAchievement(17);
    giveLore(18);
  }



 
  if (player.experience.every(i => i.neq(0))) {  // 1 experience in Resolve, Resonance, Reputation
    giveNormalAchievement(9);
    giveLore(10);
  }
  if (player.upgrades.every(i => i.every(j => j))) {  //get all legacy upgrades
    giveNormalAchievement(13);
    giveLore(14);
  }
  if (player.stats.recordDevelopment[''] >= 86400) {  //starfight for a day
    giveNormalAchievement(16);
    giveLore(17);
  }
 
  if (getTotalChallengeCompletions() >= 12) {   //12 missions complete
    giveNormalAchievement(19);
    giveLore(20);
  }
  if (getTotalChallengeCompletions() >= 20) {  //20 missions complete
    giveNormalAchievement(20);
    giveLore(21);
  }
  if (player.dilation > 0) {  //make pre-eminence
    giveNormalAchievement(22);
    giveLore(23);
  }
  if (player.dilation >= 100 / 3) {  // 33.3 pre-eminence
    giveNormalAchievement(23);
    giveLore(24);
  }
  if (getTotalEnlightened() >= 40) {  // leader rank 40
    giveNormalAchievement(24);
    giveLore(25);
  }
  if (getTotalDevs() >= 1e9) {  //billion skill
    giveNormalAchievement(25);
    giveLore(26);
  }
  if (player.achievements.normal.list.every(x => x)) {  // all normal achievements
    giveLategameAchievement(0);
    giveLore(28);
  }

  if (getEffect(7) >= 10) {   // boost 10x
    giveLategameAchievement(3);
    giveLore(31);
  }
  if (getTotalChallengeCompletions() >= 42) {  //42 nissions complete
    giveLategameAchievement(4);
    giveLore(32);
  }
  if (player.dilation >= 1e12) {  //trillion provenance (or preeminence?)
    giveLategameAchievement(5);
    giveLore(33);
  }
  if (getTotalEnlightened() >= 80) {  //leadership 80
    giveLategameAchievement(6);
    giveLore(34);
  }
  if (getTotalDevs() >= 1e13) {  //trillian skill
    giveLategameAchievement(7);
    giveLore(35);
  }
  if (player.stats.recordDevelopment[''] >= 63115200) {  //17532 hours (2 years)
    giveLategameAchievement(8);
  }
}
