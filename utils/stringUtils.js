
function splitByWhiteSpaces(sentence) {
  return sentence
    .split(" ")
    .filter((word) => word !== "")
    .map((word) => word.trim());
}


module.exports = {splitByWhiteSpaces};