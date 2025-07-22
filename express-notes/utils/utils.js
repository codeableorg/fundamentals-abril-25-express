// const math = require("Math")
function getNextId() {
  const newId = Math.random();
  return Math.floor(newId * 100);
}

module.exports = getNextId;
