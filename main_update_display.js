var MainUIColors = {
  button_inactive: '#666666',
  button_active: '#88DD88',
  button_useless: '#CCCC44',
  button_inactive_text: '#444444',
  button_active_text: '#444444',
  button_bought: '#00C0F0'
}

function updateDisplay () {
  updateTabButtonDisplay();
  document.getElementById("current-fight-time").innerHTML = toTime(player.progress[0]);
  for (let i = 0; i <= 6; i++) {
    document.getElementById("progress-span-" + i).innerHTML = toTime(player.progress[i]);
  }
  document.getElementById("progress-span-7").innerHTML = format(player.progress[7], 4);
  for (let i = 1; i <= 7; i++) {
    document.getElementById("effect-span-" + i).innerHTML = formatEffect(i);
  }
  for (let i = 0; i <= 4; i++) {
    document.getElementById("devs-" + i).innerHTML = format(player.devs[i]);
  }
  for (let i = 5; i <= 6; i++) {
    let el = document.getElementById('prestige-' + i);
    let btn = document.getElementById('prestige-' + i + '-button');
    if (canPrestigeWithoutGain(i)) {
      el.innerHTML = formatEffect(i) + ' -> ' + formatEffect(i) + '<br/>' + toTime(player.progress[i]) + ' -> ' + toTime(player.progress[i]) + '<br/>no gain';
      btn.style.backgroundColor = UIColors.button_useless;
    } else if (canPrestige(i)) {
      let newValue = newValueFromPrestige();
      el.innerHTML = formatEffect(i) + ' -> ' + formatEffect(i, newValue) + '<br/>' + toTime(player.progress[i]) + ' -> ' + toTime(newValue) + '<br/>' + toTime(newValue - player.progress[i]) + ' gain'
      btn.style.backgroundColor = UIColors.button_active;
    } else if (player.currentChallenge === 'unprestigious') {
      el.innerHTML = 'Disabled in this challenge.';
      btn.style.backgroundColor = UIColors.button_inactive;
    } else {
      el.innerHTML = 'Requires ' + toTime(1800) + ' Starfighting.';
      btn.style.backgroundColor = UIColors.button_inactive;
    }
  }
  if (player.progress[7] >= 1) {
    document.getElementById('enlightened-desc').innerHTML = 'Reset Leadership and make it slower, but stronger.';
    document.getElementById('enlightened-button').style.backgroundColor = UIColors.button_active;
  } else {
    document.getElementById('enlightened-desc').innerHTML = 'Requires full Leadership';
    document.getElementById('enlightened-button').style.backgroundColor = UIColors.button_inactive;
  }
  if (canUpdate()) {
    let gain = getUpdateGain();
    document.getElementById('update-gain').innerHTML = 'Gain ' + format(gain) + ' Legacy Point' + (gain.eq(1) ? '' : 's') + '.';
    document.getElementById('update-button').style.backgroundColor = UIColors.button_active;
  } else {
    document.getElementById('update-gain').innerHTML = 'Requires ' + toTime(getChallengeGoal(player.currentChallenge)) + ' Starfighting.';
    document.getElementById('update-button').style.backgroundColor = UIColors.button_inactive;
  }
  document.getElementById('update-points').innerHTML = format(player.updatePoints);
  document.getElementById('updates').innerHTML = format(player.updates);
  document.getElementById('power-gain-per-experience').innerHTML = format(getPowerGainPerExperience());
  document.getElementById('additional-devs-due-to-updates').innerHTML = format(getAdditionalDevsDueToUpdates());
  for (let i = 0; i <= 2; i++) {
    document.getElementById('update-experience-span-' + i).innerHTML = format(player.experience[i]);
    document.getElementById('update-power-span-' + i).innerHTML = format(player.power[i]);    // POWER SPAN
    document.getElementById('update-effect-span-' + i).innerHTML = format(getUpdatePowerEffect(i));
    for (let j = 0; j <= 1; j++) {
      document.getElementById('up-' + j + '-' + i + '-cost').innerHTML = format(getUpgradeCost(j, i));
      document.getElementById('up-' + j + '-' + i + '-bought').innerHTML = updateUpgradeBought(j, i) ? ' (bought)' : '';
      let btn = document.getElementById('up-' + j + '-' + i + '-button');
      if (updateUpgradeActive(j, i)) {
        btn.style.backgroundColor = MainUIColors.button_bought;
      } else if (updateUpgradeBought(j, i)) {
        btn.style.backgroundColor = MainUIColors.button_useless;
      } else if (canBuyUpdateUpgrade(j, i)) {
        btn.style.backgroundColor = MainUIColors.button_active;
      } else {
        btn.style.backgroundColor = MainUIColors.button_inactive;
      }
    }
  }
  updateLonelyInfoDisplay();
  updateAutoDisplay();
  updateChallengeDisplay();
  // One line of code, it can go here.
  /*document.getElementById('total-challenge-completions-milestone-tab').innerHTML = format(getTotalChallengeCompletions());*/
  // Also one line of code, it can go here too.
  document.getElementById('upgradeless-reward-up-1-0').innerHTML = format(challengeReward('upgradeless'))
  //document.getElementById('progress-milestones').innerHTML = player.milestones;
  document.getElementById('progress-milestones-effect').innerHTML = getMilestoneEffect();
  document.getElementById('record-development').innerHTML = toTime(player.stats.recordDevelopment['']);
  document.getElementById('unassigned-devs').innerHTML = format(getUnassignedDevs());
  document.getElementById('enlightened').innerHTML = getTotalEnlightened();
  document.getElementById('last-update-point-gain').innerHTML = format(player.stats.last.updatePointGain);
  document.getElementById('game-speed').innerHTML = format(getGameSpeed(), 4);
  document.getElementById('time-since-last-enlightened').innerHTML = toTime((Date.now() - player.stats.last.enlightened) / 1000);
  document.getElementById('time-since-last-prestige').innerHTML = toTime((Date.now() - player.stats.last.prestige) / 1000);
  document.getElementById('time-since-last-update').innerHTML = toTime((Date.now() - player.stats.last.update) / 1000);
  document.getElementById('legacy_to_resonance').innerHTML = player.legacy.toggles[1];
  document.getElementById('legacy_to_resource').innerHTML = player.legacy.toggles[2];
  document.getElementById('legacy_to_resolve').innerHTML = player.legacy.toggles[0];
  if (player.options.hardMode) {
    document.getElementById('hard-mode-span').innerHTML = 'Hard mode: on';
  } else {
    document.getElementById('hard-mode-span').innerHTML = 'Hard mode: off';
  }
  /* document.getElementById('devs-plural').innerHTML = (getTotalDevs() === 1) ? '' : 's'; */
  /* document.getElementById('update-points-plural').innerHTML = (player.updatePoints.eq(1)) ? '' : 's';*/
 /*  document.getElementById('updates-plural').innerHTML = (player.updates === 1) ? '' : 's';*/
  /* document.getElementById('additional-devs-due-to-updates-plural').innerHTML = (getAdditionalDevsDueToUpdates() === 1) ? '' : 's';*/
  /* document.getElementById('progress-milestones-plural').innerHTML = (player.milestones === 1) ? '' : 's'; */
  /* document.getElementById('progress-milestones-to-be').innerHTML = (player.milestones === 1) ? 'is' : 'are'; */
  /* document.getElementById('unassigned-devs-plural').innerHTML = (getUnassignedDevs() === 1) ? '' : 's'; */
  //document.getElementById('enlightened-plural').innerHTML = (getTotalEnlightened() === 1) ? '' : 's';
  /* document.getElementById('last-update-point-gain-plural').innerHTML = player.stats.last.updatePointGain.eq(1) ? '' : 's'; */
}
