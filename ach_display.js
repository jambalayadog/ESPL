var achievements = {
  complete: '&#x2611;',
  checkbox: '&#x2610;',
  oldx: '&#x2718;',
  oldcheck: '&#x2714;',
  checkboxcolor: '#FFAAAA',
  completecolor: '#AAFFAA'
}

function updateAchievementDisplay() {
  document.getElementById('total-normal-achievements').innerHTML = player.achievements.normal.number;
  document.getElementById('total-normal-achievements-plural').innerHTML = (player.achievements.normal.number === 1) ? '' : 's';
  document.getElementById('normal-achievements-effect').innerHTML = format(getNormalAchievementsEffect());
  document.getElementById('normal-achievements-patience-effect').innerHTML = format(getNormalAchievementsPatienceEffect());
  document.getElementById('normal-achievements-patience-kept-effect').innerHTML = format(getNormalAchievementsPatienceKeptEffect());
  for (let i = 0; i <= 26; i++) {
    if (player.achievements.normal.list[i]) {
      document.getElementById('normal-ach-status-' + i).innerHTML = achievements.complete;
      document.getElementById('normal-ach-status-' + i).style.color = achievements.completecolor;
    } else {
      document.getElementById('normal-ach-status-' + i).innerHTML = achievements.checkbox;
      document.getElementById('normal-ach-status-' + i).style.color = achievements.checkboxcolor;
    }
  }
  document.getElementById('total-lategame-achievements').innerHTML = player.achievements.lategame.number;
  document.getElementById('total-lategame-achievements-plural').innerHTML = (player.achievements.lategame.number === 1) ? '' : 's';
  document.getElementById('lategame-achievements-patience-effect').innerHTML = format(getLategameAchievementsPatienceEffect());
  document.getElementById('lategame-achievements-completions-effect').innerHTML = format(getLategameAchievementsCompletionsEffect());
  document.getElementById('lategame-achievements-patience-kept-effect').innerHTML = format(getLategameAchievementsPatienceKeptEffect());
  for (let i = 0; i <= 8; i++) {
    if (player.achievements.lategame.list[i]) {
      document.getElementById('lategame-ach-status-' + i).innerHTML = achievements.complete;
      document.getElementById('lategame-ach-status-' + i).style.color = achievements.completecolor;
    } else {
      document.getElementById('lategame-ach-status-' + i).innerHTML = achievements.checkbox;
      document.getElementById('lategame-ach-status-' + i).style.color = achievements.checkboxcolor;
    }
  }
  if (checkForSpecificAchievement(2)) {                                   // when we Retrofit for the first time, unlock Fleets and
    var ele = document.getElementsByClassName("unlock_prestige");         // show the fleet and leadership stats
    for (var i = 0; i < ele.length; i++) {
      ele[i].style.visibility = 'visible';
    }
    document.getElementById("tutorial_help").style.visibility = "hidden";
  }
  
}
