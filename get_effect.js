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
    let j = Math.floor(maybeLog(baseDevs() + getAdditionalDevsDueToUpdates() + x * getUpdatePowerEffect(2) * challengeReward('lonely') / 300));
    let k = maybeLog(baseDevs() + getAdditionalDevsDueToUpdates() + x * getUpdatePowerEffect(2) * challengeReward('lonely') / 300);
    document.getElementById("progress_nextdev").value = k-j;
  }
}

function getProgressToNextHundredth(i) {
  
  if (typeof lastUpdate == 'undefined') {
    lastUpdate = [1, 1];
  }
  index_lf = i - 1;                                                             //translate aspect to LF array

  let quickprogress = getEffect(i);
  let currentprogress = getEffect(i) - (Math.floor(getEffect(i) * 100) / 100);  // drop digits bigger than a hundredth
  let roundedcurrent = Math.ceil(currentprogress * 10000) / 10000               // round it nearest 10,000th 
  let nextprogress = 0.01;                                                      // next progress is 2 significant digits
  let roundednext = Math.round((nextprogress + Number.EPSILON) * 100) / 100;    // round to 2 sig  digits (is this necessary?)
  let progress = roundedcurrent / roundednext;                                  // find the ratio

  if (quickprogress / lastUpdate[index_lf] >= 1.002 ) {
    progress = 1
  }
  
  if ( progress >= 1) {                                                           //loopy loop; sometimes this gets missed, may be too late in order?
    progress = 1;
  }
  
  //const showdebug = i == 2 ? console.log('i ', i, 'lastUpdate[index_lf]: ', lastUpdate[index_lf].toFixed(4), ' Progress: ', progress.toFixed(4), 'quickprogress: ', quickprogress, 'rate: ', (quickprogress / lastUpdate[index_lf]).toFixed(4)): '';
  lastUpdate[index_lf] = quickprogress;

  if (player.progress[i] == 0) {                                                  //haven't started, set it to 0
    return 0;
  } else if (player.progress[i] <= 2) {                                          //started in the last 12 seconds, subtract -0.5 because rounding
    return progress -= 0.5;
  } 
  
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
