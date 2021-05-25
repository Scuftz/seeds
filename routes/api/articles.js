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
  let typeRequest = req.params.status;
  Article.find( { "process_status": { $eq: typeRequest } } )
    .then(article => res.json(article))
    .catch(err => res.status(404).json({ noarticlefound: 'No Article found' }));
});

// @route POST api/articles
// @description Search function to search for articles that are live
// @access Public
router.post('/search', (req, res) => {    
  // console.log(req.body);
  const query = {};
  query.process_status = "Live";

  if(req.body.keywords != "")
    query.keywords = {$regex: req.body.keywords, $options: "$i"};

  if(req.body.title != "")
    query.title = {$regex: req.body.title, $options: "$i"};
    
  if(req.body.author != "")
    query.author = {$regex: req.body.author, $options: "$i"};

  if(req.body.year != "")
  {
    var intYear = parseInt(req.body.year);
    query.year_of_pub = { $eq: intYear };    
  }

  if(req.body.journal_name != "")
    query.journal_name = {$regex: req.body.journal_name, $options: "$i"};

  Article.find(query)
    .then(article => res.json(article))
    .catch(err => res.status(404).json({ noarticlefound: 'No Article found' }));
  });


// @route GET api/articles
// @description get an article by their unique id
// @access Public
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