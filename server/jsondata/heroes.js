const fs = require('fs');

function getHeroes(name, encoding) {
  const content = fs.readFileSync(name, encoding);
  return JSON.parse(content);
}

module.exports = {
  getHeroes
};
