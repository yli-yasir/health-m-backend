const stringUtils = require("./stringUtils");

function getPatientNameSearchPattern(searchTerm) {
  const words = stringUtils.splitByWhiteSpaces(searchTerm);
  return buildPatientNameSearchPattern(words);
}

function buildPatientNameSearchPattern(words) {
  //construst a pattern to use in the regular expression
  let pattern = "";

  words.forEach((word) => {
    //assert a maybe any num of any chars - followed by boundary - then word then maybe more chars- then boundary
    pattern += `(?=.*\\b${word}.*\\b)`;
  });

  //If the assertions succeeded then match the whole string
  pattern += ".+";

  return pattern;
}

module.exports = {getPatientNameSearchPattern};