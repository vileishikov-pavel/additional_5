module.exports = function check(str, bracketsConfig) {

  for (var i = 0; i < bracketsConfig.length; i++) {
    if (str.indexOf(bracketsConfig[i][0]) > str.indexOf(bracketsConfig[i][1])) {
      return false;
    }
  }

  var brackets = humanizeBracketsConfig(bracketsConfig);
  var diffmem = [];
  var samemem = [];

  for (var i = 0; i < str.length; i++) {
    var currentChar = str[i];

    if (brackets.different[currentChar]) {
      diffmem.push(currentChar);

    } else if (brackets.same[currentChar]) {
      samemem.push(currentChar);

      for (i++; i < str.length; i++) {
        if (str[i] !== sameEl && brackets.different[str[i]]) {
          diffmem.push(str[i]);
        }
      }
    }
  }


}

function humanizeBracketsConfig (config) {
  var brackets = {
    same: {},
    different: {}
  };

  config.forEach(function (elem) {
    if (elem[0] === elem[1]) {
      brackets.same[elem[0] + ''] = elem[1] + '';
    } else {
      brackets.different[elem[0] + ''] = elem[1] + '';
    }
  });

  return brackets;
}
