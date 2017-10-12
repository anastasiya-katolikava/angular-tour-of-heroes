const fs = require('fs');

const name = 'server/mongodb/source.json';
const encoding = 'utf8';

function urlHeroesSource() {
  const settings = fs.readFileSync(name, encoding);
  const settingsOfHeroes = JSON.parse(settings);
  if (settingsOfHeroes && settingsOfHeroes.use) {
    if (settingsOfHeroes.use === 'mlab') {
      return settingsOfHeroes.mlab;
    } else {
      return settingsOfHeroes.local;
    }
  } else {
    return '';
  }
}

module.exports = {
  urlHeroesSource
};
