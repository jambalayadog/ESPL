function getEffect(i, progressOverride) {
  let x = (progressOverride === undefined) ? player.progress[i] : progressOverride;
  if (i === 1 || i === 5) {   //  Player and Fleeet Weapons (efficiency)
    if (player.currentChallenge === 'inefficient') {
      return new Decimal(1);
    } else {
      return dilationBoost(Decimal.pow(2, x / 1800 * getEffect(7)));
    }
  } else if (i === 2 || i === 6) {  // Player and Armada Systems (Refactoring)
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
  //console.log('find time to next skill point');
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
    //console.log('k: ', k, 'j: ', j)
    if (rate >= 1.00004 && newValue >= 100) {
      document.getElementById("progress_nextdev").value = 1;
      frames = 20;
    } else if (frames > 0) {
      document.getElementById("progress_nextdev").value = 1;
    } else if (isNaN(k) || isNaN(j)) {
      //console.log('NAN FOUND');
      document.getElementById("progress_nextdev").value = 1;
    } else {
      //console.log('k: ', k, 'j: ', j, 'k-j: ', k-j);
      document.getElementById("progress_nextdev").value = k-j;
    }
    frames -= 1;
    //console.log('new: ', (newValue).toFixed(4), 'old: ',(oldValue).toFixed(4), 'rate: ',(rate).toFixed(8), 'frames: ', frames);
  }
}

function getProgressToNextHundredth(i) {
  // const showdebug = i == 1 ? console.log('i: ', i, 'getEffect(i): ', getEffect(i)) : '';
  if (typeof skillframes == 'undefined') {
    skillframes = 0;
  }
  if (typeof lastUpdate == 'undefined') {
    lastUpdate = [1, 1];
  }
  index_lf = i - 1;        //translate aspect to LF array

  let firstDigit = 0;
  let secondDigit = 0;
  let rateComparison = 0;
  //console.log('i: ', i, 'effect: ', getEffect(i));
  if (isNaN(getEffect(i))) {
    firstDigit = '9';
    secondDigit = '9';
    rateComparison = 1.000;
  } else if (getEffect(i) >= 10000) {
    firstDigit = getEffect(i).toString().split('').slice(3,4);
    secondDigit = getEffect(i).toString().split('').slice(4,5);
    rateComparison = 1.001;
  } else if (getEffect(i) >= 1000) {
    firstDigit = getEffect(i).toString().split('').slice(3,4);
    secondDigit = getEffect(i).toString().split('').slice(5,6);
    rateComparison = 1.0005;
  } else if (getEffect(i) < 1) {
    firstDigit = getEffect(i).toString().split('').slice(5,6);
    secondDigit = getEffect(i).toString().split('').slice(6,7);
    rateComparison = 1.001;
  } else {
    firstDigit = getEffect(i).toString().split('').slice(4,5);
    secondDigit = getEffect(i).toString().split('').slice(5,6);
    rateComparison = 1.00062;
  }
  
  digits = Number(firstDigit + secondDigit);
  //const showdebug2 = i == 2 ? console.log('i: ', i, (getEffect(i)).toFixed(4), 'digits: ', digits):'';

  if (isNaN(getEffect(i))) {
    progress = 1;
    return progress;
  }
  let quickprogress = getEffect(i);
  let progress = digits / 100;
  let rate = quickprogress / lastUpdate[index_lf];
  
  //const showDebugRate = i == 2 ? console.log('i: ', i, 'rate: ', rate) : '';
  if (isNaN(rate)) {
    progress = 1;
    skillframes = 20;
  } else if ( (i == 1 && rate >= rateComparison) || (i == 2 && rate >= rateComparison && getEffect(i) > 0.5)) {  //1.00125
    //console.log('getEffect(i): ', getEffect(i));
    progress = 1;
    skillframes = 20;
  } else if (skillframes > 20 ){
    progress = 1;
  }
  if ( progress >= 1) {                                                           //loopy loop; sometimes this gets missed, may be too late in order?
    progress = 1;
  }
  skillframes -= 1;
  //const showdebug = i == 1 ? console.log('i ', i, 'Last Progress: ', lastUpdate[index_lf].toFixed(4), 'Current Progress: ', quickprogress.toFixed(4), 'Rate: ', (rate).toFixed(7), 'rateComparison: ', rateComparison, 'Progress: ', progress.toFixed(4)): '';
  lastUpdate[index_lf] = quickprogress;

  if (player.progress[i] == 0) {                                                  //haven't started, set it to 0
    return 0;
  } 
  //const showdebug2 = i == 1 ? console.log('i: ', i, 'digits: ', digits, 'progress: ', progress, 'frames: ', skillframes, 'Last Progress: ', lastUpdate[index_lf].toFixed(5), 'Current Progress: ', (quickprogress).toFixed(5), 'Rate: ', (rate).toFixed(7)):'';
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
  if (i === 1 || i === 5 || i == 7) {  //  Player and Armada Weapons, Leadership
    return format(effect,3) + 'x';
  } else if (i === 2 || i === 6) {  // Player and Armada Systems (Refactoring)
    return '+' + format(effect,3);
  } else if (i === 4) {    // Patience
    return toTime(effect, {secondFractions: true});
  } else {     // Space Battle & Recruiting
    return format(effect);
  }
}


function getBase(i) {
  if (i == 5) {  //weapons
    const noProgress_checkBase = player.progress[i] == 0 ? base = 1 : base = player.stats.retrofits.retrofitWeapons;
    //console.log('i: ', i, 'baseA: ', base);
    const infiniteBase = base === Infinity ? base = 'Infinity' : base = base; //THIS IS BETTER, not sure why this was what it was
    //console.log('i: ', i, 'baseB: ', base);
  } else {  //systems
    const noProgress_checkBase2 = player.progress[i] == 0 ? base = 0 : base = player.stats.retrofits.retrofitSystems;
  }
  //console.log('i: ', i, 'base: ', base);
  return base;
}

function getImprovement(i) {
  if (i == 5) {  //weapons
    let trueGain = Number(getEffect(i,(Math.max(player.progress[i], newValueFromPrestige())) / getEffect(7)));
    rate = trueGain / getBase(i);
    //console.log('TrueGain: ', trueGain, 'rate: ', rate);
    if (isNaN(rate)) {
      //console.log('rate = NaN');
      improvement = 0;
    } else if (rate === Infinity) {
      //console.log('rate = Infinity');
      improvement = ((rate-1)*100).toFixed(1);
    } else {
      //console.log('rate = rational');
      improvement = format((rate-1)*100);
    }
  } else {  //systems
    rate = formatEffect(i, newValueFromPrestige()) / formatEffect(i);
    //console.log('rate: ', rate);
    if (isNaN(rate)) {
      //console.log('rate = NaN');
      improvement = 0;
    } else if (rate === Infinity) {
      //console.log('rate = Infinity');
      improvement = ((rate-1)*100).toFixed(1);
    } else {
      //console.log('rate = rational');
      improvement = format((rate-1)*100);
    }
  }
  //console.log('i: ', i, 'improvement: ', improvement);
  return improvement;
}

function getNewBase(i) {
  if (i == 5) {  //weapons
    let trueGain = Number(getEffect(i,(Math.max(player.progress[i], newValueFromPrestige())) / getEffect(7)));
    const infiniteGain = trueGain === Infinity ? newBase = 'Infinity' : newBase = format(trueGain);
    //console.log('i: ', i, 'newBase: ', newBase);
  } else {  //systems
    rate = formatEffect(i, newValueFromPrestige())/formatEffect(i)
    const noProgress = formatEffect(i) == 0 ? newBase = getEffect(i,newValueFromPrestige()) : newBase = rate * player.stats.retrofits.retrofitSystems;
  }
  //console.log('i: ', i, 'newBase: ', newBase);
  return newBase;
}
