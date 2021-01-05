const stringUtils = require("./stringUtils");

function getPatientNameSearchPattern(searchTerm) {
  const words = stringUtils.splitByWhiteSpaces(searchTerm);
  return buildPatientNameSearchPattern(words);
}

function buildPatientNameSearchPattern(words) {
  //construst a pattern to use in the regular expression
  let pattern = "";

  words.forEach((word) => {
    //assert a maybe any num of any chars - followed by space/start - then word then maybe more chars- then space/end
    pattern += `(?=.*(^|\\s)${word}.*(\\s|$))`;
  });

  //If the assertions succeeded then match the whole string
  pattern += ".+";

  return pattern;
}

module.exports = {getPatientNameSearchPattern};