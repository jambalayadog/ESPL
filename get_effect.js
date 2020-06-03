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
    return format(effect) + 'x';
  } else if (i === 2 || i === 6) {  // Player and Fleet Systems (Refactoring)
    return '+' + format(effect);
  } else if (i === 4) {    // Patience
    return toTime(effect, {secondFractions: true});
  } else {     // Space Battle & Recruiting
    return format(effect);
  }
}
