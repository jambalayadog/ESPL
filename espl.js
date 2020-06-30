var UIColors = {
  button_inactive: '#666666',
  button_active: '#88DD88',
  button_useless: '#BBBB66',
  button_mission: '#66AAFF',
  button_inactive_text: '#444444',
  button_active_text: '#444444',
  button_bought: '#66AAFF'
}

var achievements = {
  complete: '&#x2611;',
  checkbox: '&#x2610;',
  oldx: '&#x2718;',
  oldcheck: '&#x2714;',
  checkboxcolor: '#FFAAAA',
  completecolor: '#AAFFAA'
}

var debug = {
  speedmultiplier: 1.0
}


let SKILLTOGGLE_AMOUNTS = ['20%', '100%']

function updateDebugSpeed() {
  var x = document.getElementById("debug_speedup").value;
  debug.speedmultiplier = x;
  console.log(debug.speedmultiplier)
}

function endgameUpg0Formula(x) {
  if (updateUpgradeActive(0, 0) && x > 2) {
    // Don't take 2*x^2.5 for small x.
    return Math.min(Math.exp(x), 2 * Math.pow(x, 2.5));
  } else {
    return Math.exp(x);
  }
}

function endgameUpg0FormulaInverse(x) {
  if (updateUpgradeActive(0, 0)) {
    let options = [Math.log(x), Math.pow(x / 2, 0.4)];
    let checkOption = (i) => Math.abs(endgameUpg0Formula(i) / x - 1) < 1e-9;
    return options.filter(checkOption)[0];
  } else {
    return Math.log(x);
  }
}

function centralFormula(x, c) {
  return Decimal.exp(6 * (endgameUpg0Formula(x / 3600) - 1) / c).minus(1).times(600);
}

function invertCentralFormula(x, c) {
  return 3600 * endgameUpg0FormulaInverse(c * Decimal.ln(x.div(600).plus(1)).toNumber() / 6 + 1);
}

function addProgress(orig, change, c) {
  let real = centralFormula(orig, c);
  return invertCentralFormula(real.plus(change), c);
}

function getScaling() {
  return maybeLog(1 + getEffect(2) + getEffect(6) + challengeReward('ufd'));
}

function devsWorkingOn(i) {
  let result = player.devs[i];
  if (i === 0 && updateUpgradeActive(1, 2)) {
    result += getTotalDevs();
  }
  if (hasAuto('dev-one-percent')) {
    result += getTotalDevs() / 100;
  }
  return result;
}

function maybeLog(x) {
  if (player.currentChallenge === 'logarithmic') {
    let pow = Math.min(3, 1 + getTotalChallengeCompletions() / 4);
    if (x instanceof Decimal) {
      return Decimal.pow(1 + Decimal.ln(x).toNumber(), pow);
    } else {
      return Math.pow(1 + Math.log(x), pow);
    }
  } else {
    return x;
  }
}

function getTotalProductionMultiplier() {
  return maybeLog(getEffect(1).times(getEffect(5)).times(getMilestoneEffect()).times(getUpdatePowerEffect(0)).times(challengeReward('inefficient'))).times(getNormalAchievementsEffect());
}

function addToProgress(diff) {
  let perDev = new Decimal(diff).times(getTotalProductionMultiplier());
  let scaling = getScaling();
  for (let i = 0; i <= 4; i++) {
    player.progress[i] = addProgress(player.progress[i], perDev.times(devsWorkingOn(i)), scaling);
  }
}

function checkForMilestones() {
  player.milestones = Math.max(player.milestones, Math.floor(player.progress[0] / 1800));
}

const COMPLETION_MILESTONES = [2, 4, 8, 16, 32];

function checkForCompletionMilestones() {
  while (player.completionMilestones < COMPLETION_MILESTONES.length &&
    getTotalChallengeCompletions() >= COMPLETION_MILESTONES[player.completionMilestones]) {
    player.completionMilestones++;
    updateCompletionMilestoneDisplay();
  }
}

function addToUpdatePower(diff) {
  for (let i = 0; i <= 2; i++) {
    player.power[i] = player.power[i].plus(new Decimal(diff).times(player.experience[i]).times(getPowerGainPerExperience()));
  }
}

function addToDilation(diff) {
  player.dilation = player.dilation + diff * getDilationPerSecond();
}

function getGameSpeed() {
  let speed = 1;
  if (player.currentChallenge === 'slow') {
    speed /= 1000;
  }
  speed *= challengeReward('slow');
  return speed;
}

function realTimeToGameTime(diff) {
  //console.log((diff * getGameSpeed() * player.purchaseBoostMultiplier).toFixed(2), player.purchaseBoostMultiplier);
  //console.log('boost: ', player.purchaseBoostMultiplier/100);
  return diff * getGameSpeed() * (player.purchaseBoostMultiplier/100) * (player.refreshBoost);
}

function gameCode(diff) {
  let now = Date.now();
  if (diff === undefined) {
    diff = debug.speedmultiplier * (now - player.lastUpdate) / 1000;
  }
  if (isNaN(diff)) {
    diff = 0;
  }
  realDiff = diff;

  diff = realTimeToGameTime(diff);
  player.lastUpdate = now;
  doAutoThings();
  addToProgress(diff);
  addToPatience(diff);
  addToUpdatePower(diff);
  addToDilation(diff);
  checkForMilestones();
  checkForCompletionMilestones();
  checkForRecordDevelopement();
  checkForAchievementsAndLore();
}

function checkForRecordDevelopement() {
  player.stats.recordDevelopment[''] = Math.max(
    player.progress[0], player.stats.recordDevelopment['']);
  if (player.currentChallenge !== '') {
    player.stats.recordDevelopment[player.currentChallenge] = Math.max(
      player.progress[0], player.stats.recordDevelopment[player.currentChallenge]);
  }
}

function tick() {
  gameCode();
  updateDisplay();
}

function baseDevs() {
  if (updateUpgradeActive(0, 2)) {
    return 30;
  } else {
    return 10;
  }
}

function getAdditionalDevsDueToUpdates() {
  return Math.max(0, Math.round(1 + (Math.log2(player.updates * 100))));
}

function getTotalDevs () {
  return getEffect(3);
}

function getUnassignedDevs () {
  return getTotalDevs() - player.devs.reduce((a, b) => a + b);
}

function toggleOption(x) {
  player.options[x] = !player.options[x];
}

function toggleConfirmation(x) {
  player.options.confirmations[x] = !player.options.confirmations[x];
}

function newValueFromPrestige() {
  return player.progress[0] + challengeReward('unprestigious');
}

function canPrestigeWithoutGain(i) {
  return canPrestige(i) && player.progress[i] >= newValueFromPrestige();
}

function canPrestige(i) {
  return player.currentChallenge !== 'unprestigious' && player.progress[0] >= 1800;
}

function confirmPrestige(i) {
  let whatWillReset = 'Starfight, Piloting, Systems, Weapons, Cool, and Leader Ranks';
  if (canPrestigeWithoutGain(i) &&
  player.options.confirmations.prestigeWithoutGain) {
    return confirm('Are you sure you want to prestige? You will gain nothing, and your ' + whatWillReset + ' will reset.');
  } else if (player.options.confirmations.prestige) {
    return confirm('Are you sure you want to prestige? Your ' + whatWillReset + ' will reset.');
  } else {
    return true;
  }
}

function prestigeCore(i, now, oldProgress) {
  //console.log('D: effect: ', Number(getEffect(i)));
  for (let j = 0; j <= 4; j++) {
    player.progress[j] = 0;
    player.devs[j] = 0;
  }
  //console.log('E: effect: ', Number(getEffect(i)));
  player.progress[7] = 0;
  //console.log('F: effect: ', Number(getEffect(i)));
  player.enlightened = 0;
  //console.log('G: effect: ', Number(getEffect(i)));
  givePrestigeAchievementsAndLore(i, oldProgress);
  player.stats.last.prestige = now;
  player.stats.last.enlightened = now;
  player.stats.last.prestigeType = i;
  //console.log('3. - i: ', i, 'progress:',player.progress[i], 'new value: ',newValueFromPrestige(), 'effect: ', Number(getEffect(i)));   // get effect of player.progress[0] in [5]/[6] terms
  //console.log('1. retros: ', player.stats.retrofits);
  //const retrofitType = i == 5 ? player.stats.retrofits.retrofitWeapons = Number(getEffect(i)) : player.stats.retrofits.retrofitSystems = getEffect(i);
  const retrofitType = i == 5 ? player.stats.retrofits.retrofitWeapons = getEffect(i) : player.stats.retrofits.retrofitSystems = getEffect(i);
  //console.log('2. retros: ', player.stats.retrofits);
}


function prestige(i, noConfirm) {
  if (canPrestige(i) && (noConfirm || confirmPrestige(i))) {
    let oldProgress = player.progress[i];
    //console.log('1. - i: ', i, 'progress:',player.progress[i], 'new value: ',newValueFromPrestige(), 'rate: ', newValueFromPrestige()/player.progress[i], 'effect: ', Number(getEffect(i)));
    //console.log('B: effect: ', Number(getEffect(i)), 'prediction: ', Number(getEffect(i))*1.343);
    let lookAhead = Math.max(player.progress[i], newValueFromPrestige());
    //console.log('lookAhead: ', lookAhead, 'time', getEffect(i, lookAhead));
    let lookAhead2 = lookAhead / getEffect(7);
    //console.log('lookAhead2: ', lookAhead2, 'time', getEffect(i, lookAhead2), 'getEffect(7): ', getEffect(7));
    //console.log(Math.max(player.progress[i], newValueFromPrestige()), getEffect(i,Math.max(player.progress[i], newValueFromPrestige())))
    player.progress[i] = Math.max(player.progress[i], newValueFromPrestige());
    let now = Date.now();
    //console.log('C: effect: ', Number(getEffect(i)));
    prestigeCore(i, now, oldProgress);
  }
}

function enlightened() {
  if (player.progress[7] >= 1) {
    
    player.lastLeaderBoost = getEffect(7);
    //console.log('last leader boost: ', player.lastLeaderBoost);
    player.progress[7] = getPatienceMeterAfterEnlightened();
    player.enlightened++;
    player.stats.last.enlightened = Date.now();
    player.achievements.stats.savingTokens = false;
  }
}

function getMilestoneEffect() {
  return 1 + player.milestones;
}

var changeDevsInterval = 100
var changeDev = null


function toggleSkillAssignAmount(i) {
  //console.log("i: ", i, "player.skill.toggles[i]:", player.skill.toggles[i])
  if (player.skill.toggles[i] == '20%') {
    player.skill.toggles[i] = '100%';
    document.getElementById('toggleskill' + i + '_1').classList.remove('toggle_active');
    document.getElementById('toggleskill' + i + '_2').classList.add('toggle_active');
  } else {
    player.skill.toggles[i] = "20%";
    document.getElementById('toggleskill' + i + '_1').classList.add('toggle_active');
    document.getElementById('toggleskill' + i + '_2').classList.remove('toggle_active');
  }
  //console.log("new: ", player.skill.toggles[i])
}

function addToggle(i) {
  var toggleAmount = player.skill.toggles[i];
  if (toggleAmount =="20%") {
    var amountAvailable = getTotalDevs();
    const amount = amountAvailable < 5 ? amountToToggle = 1 : amountToToggle = Math.floor(0.2 * getTotalDevs());
    tryToChangeDevs(i, amountToToggle);
  } else { 
    var amountToToggle = getTotalDevs();
    tryToChangeDevs(i, amountToToggle);
  }
}

function subToggle(i) {
  var toggleAmount = player.skill.toggles[i];
  if (toggleAmount =="20%") { 
    var amountAvailable = getTotalDevs();
    const amount = amountAvailable < 5 ? amountToToggle = -1 : amountToToggle = Math.ceil(-0.2 * getTotalDevs());
    //var amountToToggle = Math.ceil(-0.2 * getTotalDevs());
    tryToChangeDevs(i, amountToToggle);
  } else { 
    var amountToToggle = -getTotalDevs();
    tryToChangeDevs(i, amountToToggle);
  }
}

function tryToChangeDevs(i, change) {
  if (change > getUnassignedDevs() ) {
    change = getUnassignedDevs()
    setDevs(i, player.devs[i] + change);
  } else if (player.devs[i] + change < 0) {
    setDevs(i, 0);
  } else {
    setDevs(i, player.devs[i] + change);
  }
}

function addDev(i) {                // I is which category 3 = piloting, 0 = starfight, 4 = cool
  tryToChangeDevs(i, 1)
}

function subtractDev(i) {
  tryToChangeDevs(i, -1)
}

function maxDev(i) {
  setDevs(i, player.devs[i] + getTotalDevs() - player.devs.reduce((a, b) => a + b));
}

function zeroDev(i) {
  setDevs(i, 0);
}

function mouseOutDevs() {
  clearInterval(changeDev)
}

function setDevs(i, x) {
  player.devs[i] = x;
  if (x !== 0) {
    player.achievements.stats.noDevsForThat = false;
  }
}

function diminishingReturns(x) {
  return 1 / 10 - 1 / (10 + x);
}

function updateOtherDisplay() {
  // Add other stuff here if needed.
  fillInDilationUpgrades();
}

function convertToESPL(x) {
  switch(x) {
    case 'Logarithmic':
      return 'Inner Soulo';
    case 'Inefficient':
      return 'Passive War';
    case 'UFD':
      return 'Hack, Slice, Rig';
    case 'Lonely':
      return 'Command Role';  
    case 'Impatient':
      return 'Without a Leader';  
    case 'Unprestigious':
      return 'Old Farm Equipment';  
    case 'Slow':
      return 'Space Shit Creek';  
    case 'Powerless':
      return 'Who I Am';  
    case 'Upgradeless':
      return 'All for Naught';  
  }
  return x;
}

function updateChallengeDisplay() {
  document.getElementById('total-challenge-completions').innerHTML = format(getTotalChallengeCompletions());
  document.getElementById('missioncontrol_missionscomplete').innerHTML = format(getTotalChallengeCompletions());
  document.getElementById('current-challenge').innerHTML = convertToESPL(getChallengeForDisplay(player.currentChallenge));
  document.getElementById('missioncontrol_currentmission').innerHTML = convertToESPL(getChallengeForDisplay(player.currentChallenge));
  document.getElementById('next-challenge-unlock').innerHTML = nextChallengeUnlock();
  for (let i in CHALLENGE_UNLOCKS) {
    if (isChallengeUnlocked(i)) {
      document.getElementById(i + '-td').style.display = '';
    } else {
      document.getElementById(i + '-td').style.display = 'none';
    }
    if (player.currentChallenge == i) {
      document.getElementById(i + '-button').style.backgroundColor = UIColors.button_mission;
    } else if (challengeCompletions(i) >= 1) {                                                //gradient this, maybe exponentially?
      document.getElementById(i + '-button').style.backgroundColor = UIColors.button_useless;
    } else {
      document.getElementById(i + '-button').style.backgroundColor = UIColors.button_active;
    }
    document.getElementById(i + '-goal').innerHTML = toTime(getChallengeGoal(i));
    document.getElementById('record-development-in-' + i).innerHTML = toTime(player.stats.recordDevelopment[i]);
    document.getElementById(i + '-reward-description').innerHTML = describeChallengeReward(i);
    document.getElementById(i + '-completed-description').innerHTML = describeChallengeCompleted(i);
  }
  if (player.dilation > 0) {
    document.getElementById('dilation').style.visibility = '';
    /* document.getElementById('dilation-text').innerHTML = 'Provenance: ' + format(player.dilation, 4) + '<br/>Provenance/sec: ' + format(getDilationPerSecond(), 4) + '<br/>Weapons & Systems Power: ^' + format(getDilationEffect(), 4); */
    document.getElementById('dilation-text').innerHTML = format(player.dilation, 4);
    document.getElementById('dilation-text2').innerHTML = '^' + format(getDilationEffect(), 4);
    document.getElementById('missions_provenance_per_second').innerHTML = format(getDilationPerSecond(), 4);
  } else {
    document.getElementById('dilation').style.visibility = 'hidden';
    document.getElementById('missions_provenance_per_second').innerHTML = 0;
  }
}

function updateCompletionMilestoneDisplay() {
  for (let i = 0; i < COMPLETION_MILESTONES.length; i++) {
    if (player.completionMilestones > i) {
      document.getElementById('milestone-status-' + i).innerHTML = achievements.complete;
      document.getElementById('milestone-status-' + i).style.color = achievements.completecolor;
    } else {
      document.getElementById('milestone-status-' + i).innerHTML = achievements.checkbox;
      document.getElementById('milestone-status-' + i).style.color = achievements.checkboxcolor;
    }
  }
}

function confirmToggleHardMode() {
  if (player.options.hardMode) {
    return confirm(
      'Turning hard mode off will make various things easier again. ' +
      'This includes upgrade costs, mission requirements, and some mission goals being lowered. ' +
      'Are you sure you want to do this?');
  } else {
    return confirm(
      'Turning hard mode on will make various things harder. ' +
      'This includes upgrade costs, mission requirements, and some mission goals being increased. ' +
      'Also note that the intended default mode is non-hard-mode. Are you sure you want to do this?');
  }
}

function toggleHardMode() {
  if (confirmToggleHardMode()) {
    player.options.hardMode = !player.options.hardMode;
  }
}

window.onload = function () {
  loadGameStorage();
  setInterval(tick, 50);
  setInterval(saveGame, 10000);
}

function refreshBoost() {
  let refreshTime = Date.now() - player.refreshLast;
  let refreshTarget = 8.64e+7; //(24 hours)
  if ( refreshTime >= refreshTarget ) {
    player.refreshBoost = Math.max(0.5, 1.0 * (refreshTarget/refreshTime));
  } else {
    player.refreshBoost = 1.0;
  }
  //console.log(player.refreshBoost, refreshTime);
  document.getElementById('refresh_boost').innerHTML = (player.refreshBoost * 100).toFixed(0) + '%';
}


function applyCSSStyling() {
  currentChallenge = player.currentChallenge;
  ele = document.getElementById('missionprogress');
  ele.className = 'progresstipbar';
  console.log(currentChallenge);
  switch(currentChallenge) {
    case 'logarithmic':
      ele.classList.add('progresstip_mission1');
      break;
    case 'inefficient':
      ele.classList.add('progresstip_mission2');
      break;
    case 'ufd':
      ele.classList.add('progresstip_mission3');
      break;
    case 'lonely':
      ele.classList.add('progresstip_mission4');
      break;
    case 'impatient':
      ele.classList.add('progresstip_mission5');
      break;
    case 'unprestigious':
      ele.classList.add('progresstip_mission6');
      break;
    case 'slow':
      ele.classList.add('progresstip_mission7');
      break;
    case 'powerless':
      ele.classList.add('progresstip_mission8');
      break;
    case 'upgradeless':
      ele.classList.add('progresstip_mission9');
      break;
  }
}

function closeQuickTips() {
  document.getElementById("tutorial_help").style.visibility = "hidden";
  player.dismissedQuickTips = true; 
}