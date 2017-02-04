var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpeciesSchema = new Schema({
  name: String,
  image: String
});

module.exports = mongoose.model('Species', SpeciesSchema);
