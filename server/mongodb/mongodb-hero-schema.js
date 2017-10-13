const mongoose = require('mongoose');
const uuid = require('node-uuid');
const HeroSchema = mongoose.Schema;

const HeroModelSchema = new HeroSchema({
  _id: {
    type: String,
    default: uuid.v4
  },
  name: String
});

const HeroModel = mongoose.model('HeroModel', HeroModelSchema);

module.exports = HeroModel;
