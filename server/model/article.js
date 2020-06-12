const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  created: { type: Date, default: Date.now },
  image: String
});

module.exports = mongoose.model('article', ArticleSchema)