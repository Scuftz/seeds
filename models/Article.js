const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
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
  },
  volume_number: {
    type: Number,
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