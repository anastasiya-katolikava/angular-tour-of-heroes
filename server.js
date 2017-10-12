const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./server/routes/api');
const crud = require('./server/mongodb/mongodb-hero-resource');
const heroesData = require('./server/jsondata/heroes');

const heroesJSONFile = 'data-heroes.json';
const encoding = 'utf8';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    crud.createDefaultHeroes(heroesData.getHeroes(heroesJSONFile, heroesData));
    console.log(`Tour of heroes running on localhost:${port}`);
});
