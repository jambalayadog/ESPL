function toggleAutoOn(x) {
  player.auto[x].on = !player.auto[x].on;
}

function updateAutoDev(i) {
  player.auto.dev.settings[i] = +document.getElementById('auto-dev-' + i).value || 0;
}

function updateAutoAssignUpdatePoints(i) {
  player.auto.assignUpdatePoints.settings[i] = +document.getElementById('auto-assign-update-points-' + i).value || 0;
}

function nextAutoSetting(x) {
  player.auto[x].setting = AUTO_SETTINGS[x][(AUTO_SETTINGS[x].indexOf(player.auto[x].setting) + 1) % AUTO_SETTINGS[x].length];
  document.getElementById('auto-' + x + '-setting').innerHTML = player.auto[x].setting;
  let y = AUTO_SETTINGS[x].indexOf(player.auto[x].setting) +1;
  let z = AUTO_SETTINGS[x].length;
  if (x == 'enlightened') {
    for (i = 1; i < z+1; i++) {
      //console.log("i: ", i)
      if (i == y) {
        document.getElementById('autoleadertoggle_' + i).classList.add('toggle_active')
      } else {
        document.getElementById('autoleadertoggle_' + i).classList.remove('toggle_active')
      }
    }
  }
  if (x == 'prestige') {
    for (i = 1; i < z+1; i++) {
      //console.log("i: ", i)
      if (i == y) {
        document.getElementById('autoretrofittoggle_' + i).classList.add('toggle_active')
      } else {
        document.getElementById('autoretrofittoggle_' + i).classList.remove('toggle_active')
      }
    }
  }
  if (x == 'update') {
    for (i = 1; i < z+1; i++) {
      //console.log("i: ", i)
      if (i == y) {
        document.getElementById('autovictorytoggle_' + i).classList.add('toggle_active')
      } else {
        document.getElementById('autovictorytoggle_' + i).classList.remove('toggle_active')
      }
    }
  }
  //console.log("index: ", AUTO_SETTINGS[x].indexOf(player.auto[x].setting) +1);
  //console.log("setting: ", player.auto[x].setting);
 
}

function parseAutoValue(x) {
  try {
    let parts = x.split(':');
    let result = parts.map((i, index) => new Decimal(i).times(Decimal.pow(60, parts.length - index - 1))).reduce((a, b) => a.plus(b));
    if (isNaN(result)) {
      return new Decimal(0);
    } else {
      return result;
    }
  } catch (e) {
    return new Decimal(0);
  }
}

function updateAutoValue(x) {
  let value = document.getElementById('auto-' + x + '-value').value;
  player.auto[x].value = parseAutoValue(value);
  player.auto[x].displayValue = value;
}

function toggleAutoPrestigeInitial() {
  player.auto.prestige.initial = 5 + player.auto.prestige.initial % 2;
  document.getElementById('auto-prestige-initial').innerHTML = ['Weapons', 'Systems'][player.auto.prestige.initial - 5];
  document.getElementById('retrotypetoggle_1').classList.toggle('toggle_active');
  document.getElementById('retrotypetoggle_2').classList.toggle('toggle_active');
  
}

function toggleAutoPrestigeAlternate() {
  player.auto.prestige.alternate = !player.auto.prestige.alternate;
}

function updateAutoDisplay() {
  
  if (updateUpgradeActive(0, 2)) {                                          // check if player has Piloting's first upgrade (auto assign skills)
    var ele = document.getElementsByClassName("activity_fraction");         // show the auto fractions
    for (var i = 0; i < ele.length; i++) {
      ele[i].style.visibility='';
    }
    document.getElementById('autooptions').style.display = 'grid';          // show the Legacy Auto Options panel
    document.getElementById('auto-dev-span').style.visibility = '';         // show the auto-assign Skills option
  } else {
    /*document.getElementById('auto-dev-row').style.display = 'none';*/
    var ele = document.getElementsByClassName("activity_fraction");
    for (var i = 0; i < ele.length; i++) {
      ele[i].style.visibility='hidden'
    }
    document.getElementById('auto-dev-span').style.visibility = 'hidden';
    document.getElementById('autooptions').style.display = 'none';
  }

  for (let i = 0; i <= 2; i++) {                                            // CHECK FOR AUTO OPTIONS
    /*console.log("i = ", i, "Auto_list[i]", AUTO_LIST[i], "HasAuto: ", hasAuto(AUTO_LIST[i]))*/
    if (hasAuto(AUTO_LIST[i])) {
      /*document.getElementById('auto-' + AUTO_LIST[i] + '-span').style.visibility = '';*/
      if (AUTO_LIST[i] == 'enlightened') {
        var ele = document.getElementsByClassName("auto_leaderup");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='';
        }
      }
      if (AUTO_LIST[i] == 'prestige') {
        var ele = document.getElementsByClassName("auto_retrofit");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='';
        }
      }
      if (AUTO_LIST[i] == 'update') {
        var ele = document.getElementsByClassName("auto_spacewar");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='';
        }
      }
    } else {
      /*document.getElementById('auto-' + AUTO_LIST[i] + '-span').style.visibility = 'hidden';*/
      if (AUTO_LIST[i] == 'enlightened') {
        var ele = document.getElementsByClassName("auto_leaderup");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='none';
        }
      }
      if (AUTO_LIST[i] == 'prestige') {
        var ele = document.getElementsByClassName("auto_retrofit");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='none';
        }
      }
      if (AUTO_LIST[i] == 'update') {
        var ele = document.getElementsByClassName("auto_spacewar");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='none';
        }
      }
    }
  }
  if (hasAuto('assign-update-points')) {
    /*document.getElementById('auto-assign-update-points-row').style.display = '';*/
    var ele = document.getElementsByClassName("legacyfraction");
    for (var i = 0; i < ele.length; i++) {
      ele[i].style.visibility=''
    }
    document.getElementById('auto-assign-update-points-span').style.display = '';
  } else {
    /*document.getElementById('auto-assign-update-points-row').style.display = 'none';*/
    var ele = document.getElementsByClassName("legacyfraction");
    for (var i = 0; i < ele.length; i++) {
      ele[i].style.visibility='hidden'
    }
    document.getElementById('auto-assign-update-points-span').style.display = 'none';
  }
  /*
  if (hasAuto(AUTO_LIST[0])) {
    document.getElementById('auto-help-span').style.display = '';  //THIS IS LEFT JUSTIFYING THINGS
  } else {
    document.getElementById('auto-help-span').style.display = 'none';
  }
  */
}


function updateCookieObjectives() {
  let ele = document.getElementById('objectivetext');
  if (player.stats.recordDevelopment[''] <= 1800) {
    response = 'YOUR FIRST OBJECTIVE IS TO RETROFIT YOUR STARFIGHTER.<br/><br/><span class="guidance_objectiveinfo">ASSIGN SKILLS TO IMPROVE SYSTEMS AND WEAPONS, THEN ASSIGN SKILLS TO STARFIGHT UNTIL RETROFIT IS AVAILABLE.  YOU WON\'T STARFIGHT LONG WITHOUT AUGMENTING YOUR STARFIGHTER.</span>';
  } else if (player.stats.recordDevelopment[''] <= 18000) {
    response = 'YOUR NEXT GOAL IS TO SETTLE A WAR AND EARN LEGACY POINTS!<br/><br><span class="guidance_objectiveinfo">WORK ON YOUR PILOTING, AND RETROFIT YOUR SHIP AND UPGRADE YOUR ARMADA.  DEVELOP YOUR LEADERSHIP AND RANK UP UNTIL YOU REACH YOUR STARFIGHT GOAL AND START YOUR LEGACY.</span>';
  } else if (!(checkForSpecificAchievement(12))) {
    response = 'AMAZING!  TIME TO BUILD UP YOUR LEGACY.<br/><br/><span class="guidance_objectiveinfo">SETTLE BIGGER WARS TO EARN MORE LEGACY POINTS.  BUILD UP YOUR RESOLVE, RESONANCE, AND RESOURCE, AND BUY LEGACY UPGRADES TO CEMENT THE FOUNDATION OF YOUR LEGACY.</span>';
  } else if (!(isChallengeUnlocked('upgradeless'))) {
    response = 'UNLOCK AND COMPLETE ALL OF THE MISSION HARDSHIPS.<br/><br/><span class="guidance_objectiveinfo">AUTOMATE OPERATIONS TO OVERCOME MISSION HARDSHIPS AND EARN ADAPTATION BONUSES.  BUILD ENORMOUS ARMADAS, REACH NEW RANKS OF LEADERSHIP, AND SETTLE GALACTIC WARS.</span>';
  } else if (getDilationEffect() == 1) {
    response = 'DISCOVER YOUR ORIGIN AND DEVELOP YOUR PRE-EMINENT PROWESS.<br/><br/><span class="guidance_objectiveinfo">TAKE ON THE MOST IMPORTANT MISSION: INNER SOULO.  DISCOVER YOUR PROVENANCE AND UNVEIL YOUR PRE-EMINENT NATURE.  COMPLETE MISSIONS TO LEND INSIGHT INTO INNER SOULO.</span>';
  } else if (!(player.achievements.lategame.list.every(x => x))) {
    response = 'COMPLETE THE MASTER OBJECTIVES AND COMPLETE YOUR LEGACY.<br/><br/><span class="guidance_objectiveinfo">ATTAIN THE HIGHEST LEADERSHIP RANKS, BECOME ACE PILOT OF THE GALAXY, HARNESS THE POWER OF YOUR BEING, AND WAGE STARFIGHTS THAT RAVAGE GALAXIES ACROSS THE UNIVERSE.</span>';
  } else {
    response = 'I AM RETIRED, GET A NEW CO-PILOT.<br/><br/><span class="guidance_objectiveinfo">THANK YOU FOR PLAYING.  I HOPE YOU HAD FUN.  I LEARNED A LOT MAKING THIS PROJECT.  BY ALL MEANS, KEEP PLAYING.  YOU ARE AN EPIC STARFIGHTER PILOT AND THIS IS YOUR LEGACY.</span>';
  }
  ele.innerHTML = response;
}