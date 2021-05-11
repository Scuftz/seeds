// models/Article.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  // article_id: {
  //   type: Number,
  //   required: true
  // },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  year_of_pub: {
    type: Number
  },
  journal_name: {
    type: String,
    required: true
  },
  volume_number: {
    type: Number,
    required: true
  },
  doi: {
    type: String,
  },
  process_status: {
    type: String,
  },
  article_text: {
    type: String,
  },
  keywords: {
    type: String
  }
});

module.exports = Article = mongoose.model('article', ArticleSchema);