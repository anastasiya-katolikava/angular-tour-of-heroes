# Tour of heroes

Clone the repo
```bash
$ git clone https://github.com/anastasiya-katolikava/angular-tour-of-heroes.git
$ cd angular-tour-of-heroes
```

Install dependencies
```bash
$ npm install
```

Run the app
```bash
$ npm run build
```

Resource: mongodb and json. Change in api.js: 
```bash
$ const heroResource = require('../mongodb/mongodb-hero-resource');
$ const heroResource = require('../jsondata/json-hero-resource');
```

mongodb: choose source("local"/"mlab") in source.json
```bash
$ "use": "local"
```
