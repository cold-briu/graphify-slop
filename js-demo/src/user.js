const { add } = require('./math');

function createUser(name, baseScore, bonus) {
  const score = add(baseScore, bonus);
  return {
    name,
    score
  };
}

module.exports = { createUser };
