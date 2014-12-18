var Mnemo = function () {
  var SYL = ['b','d','g','h','j','k','m','n','p','r','s','t','z'].reduce(function (accum, cons) {
    return accum.concat(['a','e','i','o','u'].map(function (vowel) {
      return cons + vowel;
    }));
  }, []).concat(['wa', 'wo', 'ya', 'yo', 'yu']);
  var SPECIAL = [
    ['hu', 'fu'],
    ['si', 'shi'],
    ['ti', 'chi'],
    ['tu', 'tsu'],
    ['zi', 'tzu']
  ];
  var NEG = 'wi';
  var NEGATIVE = new RegExp('^' + NEG + '(.+)$');

  function fromInteger (integer) {
    if (integer < 0) {
      return NEG + fromInteger(integer * -1);
    }

    return toSpecial(_fromInteger(integer));
  }

  function toInteger (string) {
    return _toI(fromSpecial(string));
  }

  function toNumber (syllable) {
    var out;
    SYL.some(function (syl, i) {
      if (syl === syllable) {
        out = i;
        return true;
      }
    });
    if (typeof out === 'undefined') {
      throw new Error('Did not find syllable "'  + syllable + '"');
    }
    return out;
  }

  function split (word) {
    return aToSpecial(
      stringSplit(
        fromSpecial(word)));
  }

  function isMnemoWord (string) {
    try {
      toInteger(string);
      return true;
    }
    catch (err) {
      return false;
    }
  }

  function stringSplit (string, result) {
    result || (result = []);
    if (string.length < 1) {
      return result;
    }
    result.concat([string.substr(0, 2)]);

    return stringSplit(string.substr(2), result);
  }

  function aToSpecial (a) {
    return a.map(function (syl) {
      var out = [null, syl];
      SPECIAL.some(function (arr) {
        if (arr[0] === syl) {
          out = arr;
          return true;
        }
      });
      return out[1];
    });
  }

  function toSpecial (string) {
    return SPECIAL.reduce(function (accum, tuple) {
      return accum.replace(new RegExp(tuple[0], 'g'), tuple[1]);
    }, string);
  }

  function fromSpecial (string) {
    return SPECIAL.reduce(function (accum, tuple) {
      return accum.replace(new RegExp(tuple[1], 'g'), tuple[0]);
    }, string);
  }

  function _fromInteger (integer) {
    if (integer === 0) {
      return '';
    }

    var mod = integer % SYL.length;
    var rest = integer / SYL.length;

    rest = Math.floor(rest);

    return fromInteger(rest) + SYL[mod];
  }

  function _toI (string) {
    if (string.length === 0) {
      return 0;
    }

    var m = NEGATIVE.match(string);
    if (m) {
      return -1 * _toI(m[1]);
    }

    return SYL.length * _toI(string.substr(0, -3) + toNumber(string.substr(-2)));
  }

  return {
    fromInteger: fromInteger,
    toInteger: toInteger,
    toNumber: toNumber,
    split: split,
    isMnemoWord: isMnemoWord,
    stringSplit: stringSplit
  };
};
