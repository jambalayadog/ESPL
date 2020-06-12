/*const TAB_LIST = ['main', 'achievements', 'lore', 'update', 'challenges', 'completion-milestones'];*/
const TAB_LIST = ['main', 'achievements', 'update', 'challenges', 'completion-milestones'];

function updateTabButtonDisplay () {
  if (player.updates > 0) {
    document.getElementById('update-tab-button').style.display = '';
  } else {
    document.getElementById('update-tab-button').style.display = 'none';
  }
  if (player.stats.recordDevelopment[''] >= 86400) {
    document.getElementById('challenges-tab-button').style.display = '';
    //document.getElementById('completion-milestones-tab-button').style.display = '';
  } else {
    document.getElementById('challenges-tab-button').style.display = 'none';
    //document.getElementById('completion-milestones-tab-button').style.display = 'none';
  }
}



function updateTabDisplay() {
  for (let i = 0; i < TAB_LIST.length; i++) {
    if (player.tab === TAB_LIST[i]) {
      document.getElementById(TAB_LIST[i] + '-div').style.display = '';
      document.getElementById(TAB_LIST[i] + '-tab-button').className = "navitem navitem-selected";
    } else {
      /* console.log(TAB_LIST[i]) */
      document.getElementById(TAB_LIST[i] + '-div').style.display = 'none';
      document.getElementById(TAB_LIST[i] + '-tab-button').className = "navitem";
    }
  }
}

function setTab(x) {
  player.tab = x;
  updateTabDisplay();
}

