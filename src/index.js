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
    var previousChar = str[i-1];

    if (brackets.different[currentChar]) {
      diffmem.push(currentChar);
    } else if (currentChar == samemem[samemem.length - 1] && !brackets.different[previousChar]) {
      samemem.pop();
    } else if (brackets.same[currentChar]) {
      samemem.push(currentChar);
    } else if (!brackets.different[currentChar] && !brackets.same[currentChar] && brackets.same[previousChar] && samemem.length !== 0) {
      return false;
    } else if (currentChar !== brackets.different[diffmem.pop()]) {
      return false;
    }
  }

  return diffmem.length == 0 && samemem.length == 0;
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
