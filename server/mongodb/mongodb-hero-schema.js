const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema;

const HeroModelSchema = new HeroSchema({
  id: Number,
  name: String
});

const HeroModel = mongoose.model('HeroModel', HeroModelSchema);

module.exports = HeroModel;
