var formathelp = {
  micro: '&#x00B5;'
}


function format(x, n) {
  if (x === Infinity || x == 'Infinity') {
    return 'Infinity';
  }
  x = new Decimal(x);
  if (n === undefined) {
    n = 2;
  }
  let es = 0;                                           // get # of exponents, if x is greater than a million 
  while (x.gte(Decimal.pow(10, 1e6))) {
    x = x.log(10);
    es++;
  }
  let result;
  if (x.gte(1e6)) {
    let e = Math.floor(x.log(10).toNumber());           // round down to get just the e
    let m = x.div(Decimal.pow(10, e)).toNumber();       // m is the value 
    if (+m.toFixed(n) >= 10) {                          
      m /= 10;
      e++;                                              // iterate throug to get the last few e's
    }
    result = m.toFixed(n) + 'e' + e;
  } else if (x.equals(Math.round(x.toNumber()))) {
    result = '' + Math.round(x.toNumber());
  } else {
    result = x.toFixed(n);
  }
  return ''.repeat(es) + result;
  //return 'e'.repeat(es) + result;
}

function toTime(x, options) {
  if (x === Infinity) {
    return Infinity;
  }
  if (!options) {
    options = {};
  }
  if (x < 1 && options.secondFractions) {
    if (x < 1e-12) {
      let exponent = Math.floor(Math.log10(x));
      let mantissa = x / Math.pow(10, exponent);
      return mantissa.toFixed(2) + 'e' + exponent + ' s';
    }
    let level = -Math.floor(Math.log10(x) / 3);
    x *= Math.pow(1000, level)
    let prefixes = [null, 'e-3', 'e-6', 'e-9', 'e-12'];
    return x.toFixed(2) + '' + prefixes[level] + 's';
  }
  if (x / 3600 >= 1e7) {
    x = x / 31536000;
    let exponent = Math.floor(Math.log10(x));
    let mantissa = x / Math.pow(10, exponent);
    return mantissa.toFixed(2) + 'e' + exponent + ' yrs';
  }
  if (x / 3600 >= 1e5) {
    x = x / 86400;
    let exponent = Math.floor(Math.log10(x));
    let mantissa = x / Math.pow(10, exponent);
    return mantissa.toFixed(2) + 'e' + exponent + ' days';
  }
  if (x / 3600 >= 1e4) {
    x = x / 3600;
    let exponent = Math.floor(Math.log10(x));
    let mantissa = x / Math.pow(10, exponent);
    return mantissa.toFixed(2) + 'e' + exponent + ' hrs';
  }
  return [x / 3600, x / 60 % 60, Math.floor(x % 60)].map((i) => Math.floor(i).toString().padStart(2, '0')).join(':');
}

function toPercent(i) {
  percent = i * 100;
  return percent.toFixed(2) + '%'
}