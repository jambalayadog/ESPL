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
}

function toggleAutoPrestigeAlternate() {
  player.auto.prestige.alternate = !player.auto.prestige.alternate;
}

function updateAutoDisplay() {
  
  if (updateUpgradeActive(0, 2)) {                                          // check if player has Piloting's first upgrade (auto assign skills)
    var ele = document.getElementsByClassName("activity_fraction");         // show the auto fractions
    for (var i = 0; i < ele.length; i++) {
      ele[i].style.visibility=''
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
          console.log("showing leaderup")
        }
      }
      if (AUTO_LIST[i] == 'prestige') {
        var ele = document.getElementsByClassName("auto_retrofit");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='';
          console.log("showing retrofit")
        }
      }
      if (AUTO_LIST[i] == 'update') {
        var ele = document.getElementsByClassName("auto_spacewar");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='';
          console.log("showing spacewar")
        }
      }
    } else {
      /*document.getElementById('auto-' + AUTO_LIST[i] + '-span').style.visibility = 'hidden';*/
      if (AUTO_LIST[i] == 'enlightened') {
        var ele = document.getElementsByClassName("auto_leaderup");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='none';
          console.log("hiding leaderup")
        }
      }
      if (AUTO_LIST[i] == 'prestige') {
        var ele = document.getElementsByClassName("auto_retrofit");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='none';
          console.log("hiding retrofit")
        }
      }
      if (AUTO_LIST[i] == 'update') {
        var ele = document.getElementsByClassName("auto_spacewar");
        for (var j = 0; j < ele.length; j++) {
          ele[j].style.display='none';
          console.log("hiding spacewar")
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
