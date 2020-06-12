function getEffect(i, progressOverride) {
  let x = (progressOverride === undefined) ? player.progress[i] : progressOverride;
  if (i === 1 || i === 5) {   //  Player and Fleeet Weapons (efficiency)
    if (player.currentChallenge === 'inefficient') {
      return new Decimal(1);
    } else {
      return dilationBoost(Decimal.pow(2, x / 1800 * getEffect(7)));
    }
  } else if (i === 2 || i === 6) {  // Player and Fleet Systems (Refactoring)
    if (player.currentChallenge === 'ufd') {
      return 0;
    } else {
      return x / 1800 * getEffect(7);
    }
  } else if (i === 3) {   //  Recruiting
    if (player.currentChallenge === 'lonely') {
      return 1;
    } else {
      findTimeToNextSkillPoint(x);
      return Math.floor(maybeLog(baseDevs() + getAdditionalDevsDueToUpdates() + x * getUpdatePowerEffect(2) * challengeReward('lonely') / 300));
    }
  } else if (i === 4) {   // Patience
    return getTimeForPatienceMeterToMaxOut(x, player.enlightened)
  } else if (i === 7) {
    return getPatienceMeterEffect(x, getTotalEnlightened());
  }
  
}

function findTimeToNextSkillPoint(x) {
  if (player.currentChallenge === 'lonely') {
    return 0;
  } else {
    if (typeof oldValue === 'undefined') {
      oldValue = 0;
    }
    let j = Math.floor(maybeLog(baseDevs() + getAdditionalDevsDueToUpdates() + x * getUpdatePowerEffect(2) * challengeReward('lonely') / 300));
    let k = maybeLog(baseDevs() + getAdditionalDevsDueToUpdates() + x * getUpdatePowerEffect(2) * challengeReward('lonely') / 300);
    let newValue = k;
    let rate = newValue / oldValue;
    oldValue = k;
    if (rate >= 1.00004) {
      document.getElementById("progress_nextdev").value = 1;
      frames = 20;
    } else if (frames > 0) {
      document.getElementById("progress_nextdev").value = 1;
    } else {
      document.getElementById("progress_nextdev").value = k-j;
    }
    frames -= 1;
    console.log('new: ', (newValue).toFixed(4), 'old: ',(oldValue).toFixed(4), 'rate: ',(rate).toFixed(8), 'frames: ', frames);
  }
}

function getProgressToNextHundredth(i) {

  if (typeof lastUpdate == 'undefined') {
    lastUpdate = [1, 1];
  }
  index_lf = i - 1;                                                             //translate aspect to LF array

  if (i == 2) {
    off = 1;
  } else { off = 0}
  let firstDigit = getEffect(i).toString().split('').slice(3+off,4+off);
  let secondDigit = getEffect(i).toString().split('').slice(4+off,5+off);
  if (firstDigit == '.' ) {
    firstDigit = getEffect(i).toString().split('').slice(4+off,5+off);
    secondDigit = getEffect(i).toString().split('').slice(5+off,6+off);
  }
  if (secondDigit == '.') {
    secondDigit = getEffect(i).toString().split('').slice(5+off,6+off);
  }
  digits = Number(firstDigit + secondDigit);
  //const showdebug = i == 2 ? console.log('digit: ', digits):'';

  let quickprogress = getEffect(i);
  let progress = digits / 100;
  if(i == 1){
    //console.log('i: ', i, 'rate: ', quickprogress / lastUpdate[index_lf]);
  }
  //const showDebugRate = i == 1 ? console.log('i: ', i, 'rate: ', quickprogress / lastUpdate[index_lf]) : '';
  if (quickprogress / lastUpdate[index_lf] >= 1.001 ) {  //1.00125
    progress = 1
    frames = 20;
  } else if (frames > 20 ){
    progress = 1;
  }
  if ( progress >= 1) {                                                           //loopy loop; sometimes this gets missed, may be too late in order?
    progress = 1;
  }
  frames -= 1;
  //const showdebug = i == 1 ? console.log('i ', i, 'Last Progress: ', lastUpdate[index_lf].toFixed(4), 'Current Progress: ', quickprogress.toFixed(4), 'Rate: ', (quickprogress / lastUpdate[index_lf]).toFixed(7),'Progress: ', progress.toFixed(4), 'currenthundredth: ', currentprogress, 'rounded: ', roundedcurrent): '';
  lastUpdate[index_lf] = quickprogress;

  if (player.progress[i] == 0) {                                                  //haven't started, set it to 0
    return 0;
  } else if (player.progress[i] <= 2) {                                          //started in the last 12 seconds, subtract -0.5 because rounding
    return progress -= 0.5;
  } 
  //const showdebug2 = 2 == 1 ? console.log('drogress: ', progress):'';
  return progress;
}




function findTimeToNextRetrofits(i) {
  // get starfight, get progress from 5 and 6
  let currentprogress = player.progress[0];
  let cachedprogress = player.progress[i];
  let progress = currentprogress / cachedprogress;
  return progress
}

function formatEffect(i, progressOverride) {
  let effect = getEffect(i, progressOverride);
  if (i === 1 || i === 5 || i == 7) {  //  Player and Fleeet Weapons, Leadership
    return format(effect,3) + 'x';
  } else if (i === 2 || i === 6) {  // Player and Fleet Systems (Refactoring)
    return '+' + format(effect,3);
  } else if (i === 4) {    // Patience
    return toTime(effect, {secondFractions: true});
  } else {     // Space Battle & Recruiting
    return format(effect);
  }
}
