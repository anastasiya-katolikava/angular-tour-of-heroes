const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const heroesData = require('./heroes');

const router = express.Router();
const jsonParser = bodyParser.json();

const heroesJSONFile = 'data-heroes.json';
const encoding = 'utf8';

function findAllHeroes(req, res) {
  const heroes = heroesData.getHeroes(heroesJSONFile, encoding);
  res.status(200).json(heroes);
}

function findHeroesByName(req, res, name) {
  const heroes = heroesData.getHeroes(heroesJSONFile, encoding);
  const heroesByName = heroes.filter((hero) => {
    return hero.name.indexOf(name) != -1;
  });
  res.status(200).json(heroesByName);
}

function findHero(req, res, heroId) {
  const heroes = heroesData.getHeroes(heroesJSONFile, encoding);
  let heroById = null;
  heroes.forEach((hero) => {
    if (hero.id == heroId) {
      heroById = hero;
    }
  })
  if (heroById === null) {
    res.sendStatus(404);
  } else {
    res.status(200).json(heroById);
  }
}

function createDefaultHeroes(heroes) {
  fs.writeFileSync(heroesJSONFile, JSON.stringify(heroes));
}

function deleteHero(req, res, heroId = 0) {
  let heroes = heroesData.getHeroes(heroesJSONFile, encoding);
  const index = heroes.reduce((index, hero, i) => {
    return (hero.id == heroId) ? i : -1;
  });
  if(index > -1){
    const hero = heroes.splice(index, 1)[0];
    fs.writeFileSync(heroesJSONFile, JSON.stringify(heroes));
    res.status(200).json(hero);
  }
  else{
    res.sendStatus(404);
  }
}

function createHero(req, res, hero) {
  const heroes = heroesData.getHeroes(heroesJSONFile, encoding);
  let id = Math.max.apply(Math, heroes.map((heroOfCollection) => heroOfCollection.id))
  hero = {
    id: id + 1,
    name: req.body.name
  }
  heroes.push(hero);
  fs.writeFileSync(heroesJSONFile, JSON.stringify(heroes));
  res.status(200).json(hero);
}

function updateHero(req, res, heroId, hero) {
  const heroes = heroesData.getHeroes(heroesJSONFile, encoding);
  let updateHero = null;
  heroes.forEach((oneHero) => {
    if (oneHero.id == heroId) {
      oneHero.name = hero.name;
      updateHero = oneHero;
    }
  });
  fs.writeFileSync(heroesJSONFile, JSON.stringify(heroes));
  res.status(200).json(updateHero);

}

module.exports = {
createDefaultHeroes,
findHeroesByName,
findAllHeroes,
findHero,
deleteHero,
createHero,
updateHero
};
