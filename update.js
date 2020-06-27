let EXPERIENCE_TYPES = ['endgame', 'patience', 'eadstart'];
let TOGGLE_AMOUNTS = ['1', '33%', '100%']

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
  let whatWillReset = 'Armada Systems and Weapons, progress milestones, along with every Retrofit resets,';
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
  if (player.legacy.toggles[i] == '1') {
    player.legacy.toggles[i] = '33%';
    //console.log('toggle' + i + ' 33%')
    document.getElementById('toggle' + i + '_1').classList.remove('toggle_active')
    document.getElementById('toggle' + i + '_2').classList.add('toggle_active')
    document.getElementById('toggle' + i + '_3').classList.remove('toggle_active')
  } else if (player.legacy.toggles[i] == '33%') {
    player.legacy.toggles[i] = '100%';
    //console.log('toggle' + i + ' 100%')
    document.getElementById('toggle' + i + '_1').classList.remove('toggle_active')
    document.getElementById('toggle' + i + '_2').classList.remove('toggle_active')
    document.getElementById('toggle' + i + '_3').classList.add('toggle_active')
  } else {
    player.legacy.toggles[i] = "1";
    //console.log('toggle' + i + ' 1')
    document.getElementById('toggle' + i + '_1').classList.add('toggle_active')
    document.getElementById('toggle' + i + '_2').classList.remove('toggle_active')
    document.getElementById('toggle' + i + '_3').classList.remove('toggle_active')
  }
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
  if (player.legacy.toggles[i] == '1'){
    assignOne(reverseLegacyToggles(i));
  } else if (player.legacy.toggles[i] == '33%'){
    assignThird(reverseLegacyToggles(i));
  } else {
    assignAll(reverseLegacyToggles(i));
  }
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
const UPGRADE_COSTS_NEW = [15, 1e6, 10, 1e5, 5, 1e4];


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
  //player.updatePoints = player.updatePoints.minus(getUpgradeCost(i,j));   //consider spending legacy to upgrade
  player.upgrades[i][j] = true;
}
