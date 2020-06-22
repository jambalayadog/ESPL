function fillInInputs() {
  fillInAutoDev();
  fillInAutoOther();
  fillInAutoAssignUpdatePoints();
  fillInOptions();
  fillInConfirmations();
  fillInGuidance();
}

function fillInAutoDev () {
  for (let i = 0; i <= 4; i++) {
    document.getElementById('auto-dev-' + i).value = player.auto.dev.settings[i];
  }
  document.getElementById('auto-dev-on').checked = player.auto.dev.on;
}

let AUTO_LIST = ['enlightened', 'prestige', 'update'];

function fillInAutoOther () {
  for (let i = 0; i <= 2; i++) {
    if ( i != 1 ) {
      document.getElementById('auto-' + AUTO_LIST[i] + '-setting').innerHTML = player.auto[AUTO_LIST[i]].setting;
      document.getElementById('auto-' + AUTO_LIST[i] + '-value').value = player.auto[AUTO_LIST[i]].displayValue;
      document.getElementById('auto-' + AUTO_LIST[i] + '-on').checked = player.auto[AUTO_LIST[i]].on;
    }
    if ( i == 0 ) {
      document.getElementById('autoleadertoggle_1').classList.remove('toggle_active');
      let toggleSetting = player.auto[AUTO_LIST[i]].setting;
      switch (toggleSetting) {
        case 'Leader Rank':     
          document.getElementById('autoleadertoggle_1').classList.add('toggle_active');
          break;
        case 'time since last Leader Up':     
          document.getElementById('autoleadertoggle_2').classList.add('toggle_active');
          break;
        case 'time to fill Leadership':     
          document.getElementById('autoleadertoggle_3').classList.add('toggle_active');
          break;
        case 'X-second-long Retrofit':     
          document.getElementById('autoleadertoggle_4').classList.add('toggle_active');
          break;
      }
    } else if ( i == 2 ) {
      document.getElementById('autovictorytoggle_1').classList.remove('toggle_active');
      let toggleSetting = player.auto[AUTO_LIST[i]].setting;
      switch (toggleSetting) {
        case 'Starfight time':     
          document.getElementById('autovictorytoggle_1').classList.add('toggle_active');
          break;
        case 'Legacy Points':     
          document.getElementById('autovictorytoggle_2').classList.add('toggle_active');
          break;
        case 'X times last Legacy Points':     
          document.getElementById('autovictorytoggle_3').classList.add('toggle_active');
          break;
        case 'time since last Victory':     
          document.getElementById('autovictorytoggle_4').classList.add('toggle_active');
          break;
      }
    }
  }
  document.getElementById('weapons_gain_auto').checked = player.auto.gain.toggles[0];
  document.getElementById('systems_gain_auto').checked = player.auto.gain.toggles[1];
  document.getElementById('weapons_gain_input').value = format(player.auto.gain.values[0]);
  document.getElementById('systems_gain_input').value = format(player.auto.gain.values[1]);
  
  //document.getElementById('auto-prestige-initial').innerHTML = ['Weapons', 'Systems'][player.auto.prestige.initial - 5];
  //document.getElementById('auto-prestige-alternate').checked = player.auto.prestige.alternate;
}

function fillInAutoAssignUpdatePoints() {
  for (let i = 0; i <= 2; i++) {
    document.getElementById('auto-assign-update-points-' + i).value = player.auto.assignUpdatePoints.settings[i];
    let toggleSetting = player.legacy.toggles[i];
    document.getElementById('toggle' + i + '_1').classList.remove('toggle_active');
    switch (toggleSetting) {
      case '1':
        document.getElementById('toggle' + i + '_1').classList.add('toggle_active');
        break;
      case '33%':
        document.getElementById('toggle' + i + '_2').classList.add('toggle_active');
        break;
      case '100%':
        document.getElementById('toggle' + i + '_3').classList.add('toggle_active');
        break;
    }
  }
  document.getElementById('auto-assign-update-points-on').checked = player.auto.assignUpdatePoints.on;
}

function fillInDilationUpgrades() {
  document.getElementById('dilation-upgrade-0-button').innerHTML = '<span class="button_title">ACQUIRE PRE-EMINENCE</span><br/><span class="legacygroup_subtext">Multiply Leadership speed by 1.1<br/> Current Pre-eminence: ' + format(getDilationUpgradeEffect(0)) + 'x<br/>Cost: ' + format(getDilationUpgradeCost(0)) + ' Provenance</span>';
}

function fillInOptions() {
  document.getElementById('offline-progress').checked = player.options.offlineProgress;
  document.getElementById('update-challenge').checked = player.options.updateChallenge;
}

function fillInConfirmations() {
  document.getElementById('prestige-confirmation').checked = player.options.confirmations.prestige;
  document.getElementById('prestige-without-gain-confirmation').checked = player.options.confirmations.prestigeWithoutGain;
  document.getElementById('update-confirmation').checked = player.options.confirmations.update;
  document.getElementById('turn-all-update-points-into-experience-confirmation').checked = player.options.confirmations.turnAllUpdatePointsIntoExperience;
  document.getElementById('enter-challenge-confirmation').checked = player.options.confirmations.enterChallenge;
  document.getElementById('exit-challenge-confirmation').checked = player.options.confirmations.exitChallenge;
}

function fillInGuidance() {
  document.getElementById('purchasedBoostMultiplier').innerHTML = player.purchaseBoostMultiplier - 100 + '%';
}