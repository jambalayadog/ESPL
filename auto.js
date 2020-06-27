function hasAuto(x) {
  // dev-one-percent isn't really auto, except insofar as it means
  // you don't have to manually do some stuff (lonely, upgradeless).
  //console.log("X: ", x);
  let table = {
    'enlightened': 0,
    'prestige': 1,
    'update': 2,
    'assign-update-points': 3,
    'dev-one-percent': 4
  }
  //console.log("Milestones: ", player.completionMilestones, "Table X: ", table[x])
  return player.completionMilestones > table[x];
}

function autoAssignDevs() {
  for (let i = 0; i <= 4; i++) {
    player.devs[i] = 0;
  }
  for (let i = 0; i <= 4; i++) {
    let askedFor = Math.floor(getTotalDevs() * player.auto.dev.settings[i]);
    let maxAllowed = getUnassignedDevs();
    setDevs(i, Math.min(askedFor, maxAllowed));
  }
}

function autoAssignUpdatePoints() {
  // This is built to approximate what would happen given that
  // unspent update points are assigned every tick. Given this,
  // if update points are assigned to anything, they'll eventually
  // all be assigned.
  let unspentUpdatePoints = player.updatePoints;
  if (player.auto.assignUpdatePoints.settings.every(x => x === 0)) {
    return;
  }
  // This is so we don't mar the runs of crazy people who are trying to
  // do without one of the three types of experience entirely.
  let lastNonZero = player.auto.assignUpdatePoints.settings.map(x => x !== 0).lastIndexOf(true);
  let total = Math.min(1, player.auto.assignUpdatePoints.settings.reduce((a, b) => a + b));
  for (let i = 0; i <= 2; i++) {
    let askedFor = Decimal.floor(unspentUpdatePoints.times(player.auto.assignUpdatePoints.settings[i]).div(total));
    let maxAllowed = player.updatePoints;
    let x = Decimal.min(askedFor, maxAllowed);
    if (i === lastNonZero) {
      x = maxAllowed;
    }
    player.experience[i] = player.experience[i].plus(x);
    player.updatePoints = player.updatePoints.minus(x);
  }
}

let AUTO_SETTINGS = {
  'enlightened': [
    'Leader Rank',
    'time since last Leader Up',
    'time to fill Leadership',
    'X-second-long Retrofit'
  ],
  'prestige': [
    'Starfight time',
    '+X time better than current',
    '+X time better than highest',
    'time since last Retrofit'
  ],
  'update': [
    'Starfight time',
    'Legacy Points',
    'X times last Legacy Points',
    'time since last Victory'
  ]
}

function shouldEnlightened(x) {
  let realSecondsAlready = (Date.now() - player.stats.last.enlightened) / 1000;
  let gameSecondsRemaining = Math.max(0, realTimeToGameTime(x - realSecondsAlready));
  let valueIfNot = getPatienceMeterNewValue(player.progress[7], gameSecondsRemaining, player.progress[4], player.enlightened);
  let valueIfSo = getPatienceMeterNewValue(getPatienceMeterAfterEnlightened(), gameSecondsRemaining, player.progress[4], player.enlightened + 1);
  let effectIfNot = getPatienceMeterEffect(valueIfNot, getTotalEnlightened());
  let effectIfSo = getPatienceMeterEffect(valueIfSo, getTotalEnlightened() + 1);
  return effectIfSo >= effectIfNot;
}

function checkForAutoEnlightened() {
  if (typeof leadershipautoeffect == 'undefined') {
    leadershipautoeffect = 0;
  }
  let table = {
    'Leader Rank': x => getTotalEnlightened() < x,
    'time since last Leader Up': x => Date.now() - player.stats.last.enlightened >= x * 1000,
    'time to fill Leadership': x => x >= getEffect(4),
    'X-second-long Retrofit': x => shouldEnlightened(x)
  }
  while (player.progress[7] >= 1 && table[player.auto.enlightened.setting](player.auto.enlightened.value.toNumber())) {
    document.getElementById('autorankup').classList.add('bold_override');
    leadershipautoeffect = 2;
    enlightened();
  }
  leadershipautoeffect -= 1;
    if(leadershipautoeffect <= 0) {
      document.getElementById('autorankup').classList.remove('bold_override');
    }
}

function getCurrentAutoPrestigeType() {
  if (player.stats.last.prestigeType === null) {
    return player.auto.prestige.initial;
  } else {
    return 5 + (player.stats.last.prestigeType + player.auto.prestige.alternate - 5) % 2;
  }
}

function getBetterPrestigeValue() {
  return Math.max(player.progress[5], player.progress[6]);
}

function checkForAutoPrestige() {
  let type = getCurrentAutoPrestigeType();
  let table = {
    'Starfight time': x => player.progress[0] >= x,
    '+X time better than current': x => newValueFromPrestige() - player.progress[type] >= x,
    '+X time better than highest': x => newValueFromPrestige() - getBetterPrestigeValue() >= x,
    'time since last Retrofit': x => Date.now() - player.stats.last.prestige >= x * 1000
  }
  if (table[player.auto.prestige.setting](player.auto.prestige.value.toNumber())) {
    prestige(type, true);
  }
}

function toggleAutoGain(type) {
  const toggleType = type == 'systems' ? element = 'systems_gain_auto' : element = 'weapons_gain_auto';
  let toggleValue = document.getElementById(element).checked;
  const toggleTypeIndex = type == 'systems' ? index = 1 : index = 0;
  player.auto.gain.toggles[index] = toggleValue;
}

function updateAutoGain(type) {
  const setInput = type == 'systems' ? inputValue = Number(document.getElementById('systems_gain_input').value) : inputValue = Number(document.getElementById('weapons_gain_input').value);
  const setType = type == 'systems' ? type = 6 : type = 5;
  player.auto.gain.values[type-5] = inputValue;
}

function checkForAutoGain() {
  if ( player.currentChallenge != 'upgradeless') {
    
    let systemsAutoGain = document.getElementById('systems_gain_auto').checked;
    if (typeof systemsautoeffect == 'undefined') {
      systemsautoeffect = 0;
    }
    if (systemsAutoGain) {
      let systemsAutoGainValue = player.auto.gain.values[1] + 100;
      currentGain = formatEffect(6, newValueFromPrestige())/formatEffect(6);
      if (currentGain > systemsAutoGainValue / 100) {
        document.getElementById('autosystemsretrofit').classList.add('bold_override');
        prestige(6, true);
        systemsautoeffect = 2;
      }
    }
    
    let weaponsAutoGain = document.getElementById('weapons_gain_auto').checked;
    if (typeof weaponsautoeffect == 'undefined') {
      weaponsautoeffect = 0;
    }
    if (weaponsAutoGain) { 
      let weaponsAutoGainValue = player.auto.gain.values[0];
      currentGain =  getImprovement(5);
      //console.log('if: ', currentGain > weaponsAutoGainValue, 'current: ', currentGain, 'auto gain target: ', weaponsAutoGainValue);
      if (currentGain > weaponsAutoGainValue) {
        document.getElementById('autoweaponsretrofit').classList.add('bold_override');
        prestige(5, true);
        weaponsautoeffect = 2;
      }      
    }
    systemsautoeffect -= 1;
    if(systemsautoeffect <= 0) {
      document.getElementById('autosystemsretrofit').classList.remove('bold_override');
    }
    weaponsautoeffect -= 1;
    if(weaponsautoeffect <= 0) {
      document.getElementById('autoweaponsretrofit').classList.remove('bold_override');
    }
  }
  
}

function checkForAutoUpdate() {
  if (typeof settlewarautoeffect == 'undefined') {
    settlewarautoeffect = 0;
  }
  let table = {
    'Starfight time': x => player.progress[0] >= x.toNumber(),
    'Legacy Points': x => getUpdateGain().gte(x),
    'X times last Legacy Points': x => getUpdateGain().gte(player.stats.last.updatePointGain.times(x)),
    'time since last Victory': x => Date.now() - player.stats.last.update >= x.toNumber() * 1000
  }
  if (table[player.auto.update.setting](player.auto.update.value)) {
    document.getElementById('autosettlewar').classList.add('bold_override');
    update(true);
    settlewarautoeffect = 2;
  }
  settlewarautoeffect -= 1;
    if(settlewarautoeffect <= 0) {
      document.getElementById('autosettlewar').classList.remove('bold_override');
    }
}

function doAutoThings() {
  if (updateUpgradeActive(0, 2) && player.auto.dev.on) {
    autoAssignDevs();
  }
  if (hasAuto('update') && player.auto.update.on && player.currentChallenge != 'upgradeless') {
    checkForAutoUpdate();
  }
  if (hasAuto('prestige') && player.auto.prestige.on) {
    //checkForAutoPrestige();
  }
  checkForAutoGain();
  if (hasAuto('enlightened') && player.auto.enlightened.on && player.currentChallenge != 'upgradeless') {
    checkForAutoEnlightened();
  }
  if (hasAuto('assign-update-points') && player.auto.assignUpdatePoints.on) {
    autoAssignUpdatePoints();
  }
  refreshBoost()
}
