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
  //  router.get('/search/:search', (req, res) => {
    router.get('/abc/:search', (req, res) => {
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

  // @route POST api/articles
  // @description Upgraded search function
  // @access Public
  ///:keywords/:title/:author/:year/:journal_name
  router.post('/search', (req, res) => {
    
    console.log(req.body);
    // res.json({hello: "world"});

    const emptyField = new RegExp("[\w\W]*");
    const emptyNumber = new RegExp("[0-9]{4}");
    const typeRequest = "Live";
    const query = {};

    if(req.body.keywords != "")
      query.keywords = {$regex: req.body.keywords, $options: "$i"};

    if(req.body.title != "")
      query.title = {$regex: req.body.title, $options: "$i"};
    
    if(req.body.author != "")
      query.author = {$regex: req.body.author, $options: "$i"};

    if(req.body.year != "")
      query.year = {$regex: req.body.year, $options: "$i"};

    if(req.body.journal_name != "")
      query.journal_name = {$regex: req.body.journal_name, $options: "$i"};

    // console.log(query);

    // //store queries into map, use map queries in $cond/$and
    Article.find(
      query
      // $and: [
      //   { "process_status" : { $eq: typeRequest }},
      //   { "keywords" : {$regex: inputKeywords, $options: "$i"}},
      //   { "title" : {$regex: inputTitle, $options: "$i"}},
      //   { "author" : {$regex: inputAuthor, $options: "$i"}},
      //   // { "year_of_pub" : {$regex: inputYear}},
      //   { "journal_name" : {$regex: inputJournalName, $options: "$i"}}
      // ]

      // $and: [
      //   { "process_status" : { $eq: typeRequest }},
      //   { "keywords" : {$regex: emptyField, $options: "$i"}},
      //   { "title" : {$regex: "TDD Guide", $options: "$i"}},
      //   { "author" : {$regex: emptyField, $options: "$i"}},
      //   // { "year_of_pub" : {$regex: inputYear}},
        // { "journal_name" : {$regex: emptyField, $options: "$i"}}
      // ]
    )
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