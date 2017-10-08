const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  res.send('api works');
});

const heroesJSONFile = 'data-heroes.json';
const encoding = 'utf8';

function getHeroes(name, encoding) {
  const content = fs.readFileSync(name, encoding);
  return JSON.parse(content);
}

router.get('/heroes', (req, res) => {
  const heroes = getHeroes(heroesJSONFile, encoding);
  res.status(200).json(heroes);
});

router.get('/heroes/:id', (req, res) => {
  const heroes = getHeroes(heroesJSONFile, encoding);
  const id = req.params.id;
  let heroById = null;
  heroes.forEach((hero) => {
    if (hero.id == id) {
      heroById = hero;
    }
  })
  if (heroById === null) {
    res.sendStatus(404);
  } else {
    res.status(200).json(heroById);
  }
});

router.get('/heroes/name/:name', (req, res) => {
  const heroes = getHeroes(heroesJSONFile, encoding);
  const name = req.params.name;
  const heroesByName = heroes.filter((hero) => {
    return hero.name.indexOf(name) != -1;
  });
  res.status(200).json(heroesByName);
});

router.post('/heroes', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  const heroes = getHeroes(heroesJSONFile, encoding);
  let id = Math.max.apply(Math, heroes.map((hero) => hero.id))
  let hero = {
    id: id + 1,
    name: req.body.name
  }
  heroes.push(hero);
  fs.writeFileSync('data-heroes.json', JSON.stringify(heroes));
  res.status(200).json(hero);
});

router.delete('/heroes/:id', function(req, res){
  const id = req.params.id;
  let heroes = getHeroes(heroesJSONFile, encoding);
  const index = heroes.reduce((index, hero, i) => {
    return (hero.id == id) ? i : -1;
  });
  if(index > -1){
    const hero = heroes.splice(index, 1)[0];
    fs.writeFileSync(heroesJSONFile, JSON.stringify(heroes));
    res.status(200).json(hero);
  }
  else{
    res.sendStatus(404);
  }
});

router.put('/heroes/:id', jsonParser, (req, res) => {
  if (!req.body || req.params.id != req.body.id) {
    return res.sendStatus(400);
  }
  const heroId = req.body.id;
  const heroName = req.body.name;
  const heroes = getHeroes(heroesJSONFile, encoding);
  let updateHero = null;
  heroes.forEach((hero) => {
    if (hero.id == heroId) {
      hero.name = heroName;
      updateHero = hero;
    }
  });
  fs.writeFileSync(heroesJSONFile, JSON.stringify(heroes));
  res.status(200).json(updateHero);
});

module.exports = router;
