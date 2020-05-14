let EXPERIENCE_TYPES = ['endgame', 'patience', 'eadstart'];
let TOGGLE_AMOUNTS = ['1', '1/3', 'All']

function updateCore(now, gain, oldChallenge) {
  for (let i = 0; i <= 7; i++) {
    player.progress[i] = 0;
    player.devs[i] = 0;
  }
  player.milestones = 0;
  player.enlightened = 0;
  for (let i = 0; i <= 2; i++) {
    player.power[i] = new Decimal(0);
  }
  if (gain !== null) {
    giveUpdateAchievementsAndLore(now, gain, oldChallenge);
  }
  player.stats.last.update = now;
  player.stats.last.prestige = now;
  player.stats.last.enlightened = now;
  player.stats.last.prestigeType = null;
  if (gain !== null) {
    player.stats.last.updatePointGain = gain;
  }
  player.achievements.stats.savingTokens = true;
  player.achievements.stats.noDevsForThat = true;
}

function canUpdate() {
  return player.progress[0] >= getChallengeGoal(player.currentChallenge);
}

function getUpdateGainBase() {
  if (updateUpgradeActive(1, 0)) {
    return challengeReward('upgradeless');
  } else {
    return 2;
  }
}

function getUpdateGainMultiplier() {
  if (updateUpgradeActive(1, 0)) {
    return 10;
  } else {
    return 1;
  }
}

function getUpdateGain() {
  let base = getUpdateGainBase();
  let hours = Math.max(0, player.progress[0] / 3600 - 5);
  return Decimal.floor(Decimal.pow(base, hours).times(getUpdateGainMultiplier()));
}

function confirmUpdate() {
  let whatWillReset = 'Fleet Systems and Weapons, progress milestones, along with every Retrofit resets,';
  if (player.updates > 0) {
    whatWillReset = whatWillReset.replace('and progress milestones', 'progress milestones, and Resolve, Resonance, and Resources power')
  }
  if (player.options.confirmations.update) {
    return confirm('Are you sure you want to Win the Space War? Your ' + whatWillReset + ' will reset.');
  } else {
    return true;
  }
}

function update(noConfirm) {
  if (canUpdate() && (noConfirm || confirmUpdate())) {
    let gain = getUpdateGain();
    player.updatePoints = player.updatePoints.plus(gain);
    player.updates++;
    let oldChallenge = player.currentChallenge;
    player.currentChallenge = '';
    let now = Date.now();
    updateCore(now, gain, oldChallenge);
  }
}

function getPowerGainPerExperience() {
  if (player.currentChallenge === 'powerless') {
    return new Decimal(0);
  } else {
    return Decimal.max(0, (1 + Math.log2(player.updates)) / 100).times(challengeReward('powerless'));
  }
}

function toggleAmount(i) {
  console.log("Toggle: ", i, "Player legacy toggles", player.legacy.toggles)
  if (player.legacy.toggles[i] == '1') {
    player.legacy.toggles[i] = '1/3';
  } else if (player.legacy.toggles[i] == '1/3') {
    player.legacy.toggles[i] = 'All';
  } else {
    player.legacy.toggles[i] = "1";
  }
  console.log("oggled: ", i, "Player legacy toggles", player.legacy.toggles)
}

function reverseLegacyToggles(i) {
  if (i == 0) {
    return 2;    
  } else if (i == 2) {
    return 0;
  } else {
    return 1;
  }
}

function convertLegacy(i) {
  console.log("Convert: ", i, "Player legacy toggles", player.legacy.toggles)
  
  console.log(player.legacy.toggles, player.legacy.toggles[i])
  if (player.legacy.toggles[i] == '1'){
    assignOne(reverseLegacyToggles(i));
  } else if (player.legacy.toggles[i] == '1/3'){
    assignThird(reverseLegacyToggles(i));
  } else {
    assignAll(reverseLegacyToggles(i));
  }
  console.log("onvertd: ", i, "Player legacy toggles", player.legacy.toggles)
}

function assignAll(i) {
  if (!player.options.confirmations.turnAllUpdatePointsIntoExperience ||
  confirm('Are you sure you want to turn all your update points into ' + EXPERIENCE_TYPES[i] + ' experience?')) {
    player.experience[i] = player.experience[i].plus(player.updatePoints);
    player.updatePoints = new Decimal(0);
  }
}

function assignThird(i) {
  let x = Decimal.floor(player.updatePoints.div(3));
  if (player.updatePoints.gt(0) && x.eq(0)) {
    x = new Decimal(1);
  }
  player.experience[i] = player.experience[i].plus(x);
  player.updatePoints = player.updatePoints.minus(x);
}

function assignOne(i) {
  let x = Decimal.min(1, player.updatePoints);
  player.experience[i] = player.experience[i].plus(x);
  player.updatePoints = player.updatePoints.minus(x);
}

function getUpdatePowerEffect(i) {
  if (i === 0) {
    return Decimal.sqrt(player.power[i].plus(1));
  } else {
    return Decimal.log2(player.power[i].plus(2)).toNumber();
  }
}

const UPGRADE_COSTS = [5, 1e4];
const UPGRADE_COSTS_NEW = [15, 3e4, 10, 2e4, 5, 1e4];


const HARD_MODE_UPGRADE_COSTS = [10, 1e6];

function getUpgradeCost(x, y) {
  let new_x = y*2+x
  /*console.log(new_x)*/
  if (player.options.hardMode) {
    return HARD_MODE_UPGRADE_COSTS[x];
  } else {
    return UPGRADE_COSTS_NEW[new_x];
  }
}

function updateUpgradeBought(i, j) {
  return player.upgrades[i][j];
}

function updateUpgradeActive(i, j) {
  return player.currentChallenge !== 'upgradeless' && player.upgrades[i][j];
}

function canBuyUpdateUpgrade(i, j) {
  return !updateUpgradeBought(i, j) && player.experience[j].gte(getUpgradeCost(i,j));
}

function buyUpdateUpgrade(i, j) {
  if (!canBuyUpdateUpgrade(i, j)) {
    return false;
  }
  player.experience[j] = player.experience[j].minus(getUpgradeCost(i,j));
  player.upgrades[i][j] = true;
}
