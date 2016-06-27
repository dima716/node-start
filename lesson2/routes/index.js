/* npm modules */
const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const fs = require('fs');
/* npm modules */

/* app modules */
const scrapper = require('../lib/scrapper');
const config = require('../config');
const validation = require('../lib/validation');
/* app modules */


router.get('/', function(req, res) {
  res.render('index');
});

router.post('/scrap', function(req, res, next) {
  const website = req.body.website;
  const selector = req.body.selector;

  /* Error handling for user input */
  const err = new Error();
  err.statusCode = 400;

  if ( !validation.checkEmptyField(website) ) {
    err.message = 'Website field is empty';
  } else if ( !validation.checkFieldType(website) ) {
    err.message = 'Website field should be a string';
  }

  if ( !validation.checkEmptyField(selector) ) {
    err.message = 'Selector field is empty';
  } else if ( !validation.checkFieldType(selector) ) {
    err.message = 'Selector field should be a string';
  }

  if (err.message) {
    return next(err);
  }
  /* Error handling for user input */

  const scrap = scrapper(selector);

  scrap(website, config.depth)
  .then(function(store) {
    jsonfile.writeFile(config.jsonFileName, store, {spaces: config.outputJsonSpaces}, function (err) {
      if (err) {
        next(err);
      }

      res.json({
        filePath: '/data'
      });
    });
  })
  .catch(error => {
    res.status(error.statusCode || 500).send(error.message);
  });
});

router.get('/data', function(req, res, next) {
  jsonfile.readFile(config.jsonFileName, function(err, obj) {
    if (err) {
      next(err);
    }

    res.json(obj);
  });
});

module.exports = router;
