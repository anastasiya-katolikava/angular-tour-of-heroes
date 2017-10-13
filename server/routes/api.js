const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

const heroResource = require('../mongodb/mongodb-hero-resource');
const heroData = require('../jsondata/heroes');

router.get('/', (req, res) => {
  res.send('api works');
});

const heroesJSONFile = 'data-heroes.json';
const encoding = 'utf8';

router.get('/heroes', (req, res) => {
  heroResource.findAllHeroes(req, res);
});

router.get('/heroes/:id', (req, res) => {
  const id = req.params.id;
  heroResource.findHero(req, res, id);
});

router.get('/heroes/name/:name', (req, res) => {
  const name = req.params.name;
  heroResource.findHeroesByName(req, res, name);
});

router.post('/heroes', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  heroResource.createHero(req, res, {name: req.body.name});
});

router.delete('/heroes/:id', function(req, res){
  const id = req.params.id;
  heroResource.deleteHero(req, res, id);
});

router.put('/heroes/:id', jsonParser, (req, res) => {
  if (!req.body || req.params.id != req.body._id) {
    return res.sendStatus(400);
  }
  const heroId = req.body._id;
  const heroName = req.body.name;
  heroResource.updateHero(req, res, heroId, {name: heroName});
});

module.exports = router;
