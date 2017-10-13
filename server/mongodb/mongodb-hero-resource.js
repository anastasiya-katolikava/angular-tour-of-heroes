const mongoose = require('mongoose');
const HeroModel = require('./mongodb-hero-schema');
const source = require('./mongodb-hero-url-source');

const connectionMongooseDB = source.urlHeroesSource();
const collectionOfHeroes = 'heroes';

mongoose.Promise = global.Promise;
mongoose.connect(connectionMongooseDB, {
  useMongoClient: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongoDB connection error:'));

function findAllHeroes(req, res) {
  HeroModel.find().select().exec((errors, heroes) => {
    if (errors) {
      return handleError(errors);
    }
    res.status(200).json(heroes);
  });
}

function findHeroesByName(req, res, heroName) {
  HeroModel.find({'name': {'$regex': '.*' + heroName + '.*'}}).
  select().exec((errors, heroes) => {
    if (errors) {
      return handleError(errors);
    }
    res.status(200).json(heroes);
  });
}

function findHero(req, res, heroId) {
  HeroModel.findOne({
    _id: heroId
  }).exec((errors, hero) => {
    if (errors) {
      return handleError(errors);
    }
    if (hero === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(hero);
    }
  });
}

function createDefaultHeroes(heroes) {
  HeroModel.find({}, function (err, heroes) {
    if (err) {
      return handleError(err);
    }
  }).select().exec((errors, findHeroes) => {
    if (findHeroes.length < 1) {
      heroes.forEach((hero) => {
        HeroModel.create(hero, (err) => {
          if (err) {
            return handleError(err);
          }
       });
      });
    }
  });
}

function deleteHero(req, res, heroId) {
  HeroModel.remove({_id: heroId}, (errors, hero) => {
    if (errors) {
      console.log(errors);
      res.sendStatus(404);
    }
    res.status(200).json(hero);
  });
}

function createHero(req, res, hero) {
   HeroModel.create({name: hero.name}, (errors, hero) => {
      if (errors) {
        console.log(errors);
      }
      res.status(200).json(hero);
    });
}

function updateHero(req, res, heroId, hero) {
  HeroModel.update({_id: heroId}, {name: hero.name}, function(errors, updateHero){
    if (errors) {
      console.log(errors);
    }
    res.status(200).json(updateHero);
  });
}

module.exports = {
  createDefaultHeroes,
  findAllHeroes,
  findHeroesByName,
  findHero,
  deleteHero,
  createHero,
  updateHero
};
