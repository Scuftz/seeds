const { query } = require('express');
const express = require('express');
const router = express.Router();

// Load Article model
const Article = require('../../models/Article');

// @route GET api/articles/test
// @description tests articles route
// @access Public
router.get('/test', (req, res) => res.send('article route testing!'));

// @route GET api/articles
// @description Get all articles
// @access Public
router.get('/', (req, res) => {
    Article.find()
      .then(articles => res.json(articles))
      .catch(err => res.status(404).json({ noarticlesfound: 'No Articles found' }));
  });
  
  // @route GET api/articles/:id
  // @description Get single article by status
  // @access Public
  router.get('/:status', (req, res) => {
    //Article.findById(req.params.id)
    //Article.find( { "process_status": { $eq: "PendingModeration" } } )
    let typeRequest = req.params.status;
    Article.find( { "process_status": { $eq: typeRequest } } )
      .then(article => res.json(article))
      .catch(err => res.status(404).json({ noarticlefound: 'No Article found' }));
  });

  // @route GET api/articles
  // @description Search for articles
  // @access Public
   router.get('/search/:search', (req, res) => {
    let word = req.params.search;    
    let typeRequest = "Live";

    Article.find({
      $and: [
        {"process_status": { $eq: typeRequest }},
        {keywords: {$regex: word, $options: "$i"}}
      ]
    })
      .then(article => res.json(article))
      .catch(err => res.status(404).json({ noarticlefound: 'No Article found' }));
  });

  //get article by id
  router.get('/article/:id', (req, res) => {
    Article.findById(req.params.id)
      .then(article => res.json(article))
      .catch(err => res.status(404).json({ noarticlefound: 'No Article found' }));
  });

 
  
  // @route GET api/articles
  // @description add/save article
  // @access Public
  router.post('/', (req, res) => {
    Article.create(req.body)
      .then(article => res.json({ msg: 'Article added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this article' }));
  });
  
  // @route GET api/articles/:id
  // @description Update article
  // @access Public
  router.put('/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id, req.body)
      .then(article => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });
  
  // @route GET api/articles/:id
  // @description Delete article by id
  // @access Public
  router.delete('/:id', (req, res) => {
    Article.findByIdAndRemove(req.params.id, req.body)
      .then(article => res.json({ mgs: 'Article entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such article' }));
  });

  
module.exports = router;