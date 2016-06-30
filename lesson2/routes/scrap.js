/* npm modules */
const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const debug = require('debug')('server:scrap route');
/* npm modules */

/* app modules */
const scrapper = require('../lib/scrapper');
const config = require('../config');
const validation = require('../lib/validation');
const utils = require('../lib/utils');
/* app modules */

router.post('/', function(req, res, next) {
  const website = utils.stripTrailingSlash(req.body.website);
  const selector = req.body.selector;
  const depth = req.body.depth;

  /* Error handling for user input */
  const err = new Error();
  err.statusCode = 400;

  if (validation.checkEmptyField(depth)) {
    if (!validation.checkFieldTypeNumber(depth)) {
      err.message = 'Crawl depth field should be a number';
    }
  }

  if (!validation.checkEmptyField(selector)) {
    err.message = 'Selector field is empty';
  } else if (!validation.checkFieldTypeString(selector)) {
    err.message = 'Selector field should be a string';
  }

  if (!validation.checkEmptyField(website)) {
    err.message = 'Website field is empty';
  } else if (!validation.checkFieldTypeString(website)) {
    err.message = 'Website field should be a string';
  }

  if (err.message) {
    return next(err);
  }
  /* Error handling for user input */

  const scrap = scrapper(selector);

  scrap(website, depth || config.depth)
  .then((store) => {
    jsonfile.writeFile(config.jsonFileName, store, {spaces: config.outputJsonSpaces}, (err) => {
      if (err) {
        return next(err);
      }

      res.json({
        filePath: '/data'
      });
    });
  })
  .catch((error) => {
    debug('Error', error);
    next(error);
  });
});

module.exports = router;
