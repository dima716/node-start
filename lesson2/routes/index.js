/* npm modules */
const express = require('express');
const router = express.Router();
const got = require('got');
const cheerio = require('cheerio');
const parse = require('url-parse');
const jsonfile = require('jsonfile');
/* npm modules */

/* app modules */
const config = require('../config');
const utils = require('../lib/utils');
const validation = require('../lib/validation');
/* app modules */

router.get('/', function(req, res) {
  res.render('index');
});

var scrapFactory = function scrapFactory(selector) {
  const store = {};

  return function scrap (website, depth) {
    return got(website)
    .then(response => {
      return new Promise( (resolve, reject) => {
          // getting elements that correspond to the selector
          const $ = cheerio.load(response.body, {
            normalizeWhitespace: true
          });

          const elements = $(selector);

          // checking if there are elements with the selector
          // when we visit first page of the website
          if (elements.length == 0) {
            if (depth == config.depth) {
              return reject({
                statusCode: 500,
                message: 'Elements with this selector not found'
              });
            }
          }

          // getting contents of found elements
          contents = elements.map( (index, element) => {
            return utils.getElementContent( $(element) );
          }).get();

          // parse entered website url
          const reqUrlObject = parse(website);

          // save found contents of dom elements in the store using website url as a key
          store[reqUrlObject.href] = content;

          // find all links
          const links = $('a')
            .filter( (index, element) => {
              // filter links (get rid of href="tel+123", href="email", href="#foo", etc.)
              const linkHref = $(element).attr('href');
              const websiteObject = parse(website);
              const linkObject = parse(linkHref, website);

              if ( utils.isLinkValid(linkHref, linkObject.hostName, websiteObject.hostname) ) {
                return !store[linkHref]; // ensure that link href is not in our store already
              }
            })
            .map( (index, element) => {
              const linkHref = $(element).attr('href');
              const linkObject = parse(linkHref, website);

              return utils.normalizeHref(linkObject.href);
            })
            .get(); // get array of hrefs, e.g. ['yandex.ru', 'yandex.ru/weather', ...]

          // get rid of duplicates
          const filteredLinks = utils.deleteDuplicates(links); // duplicates are two or more links to the same destination

          // repeat previous steps for every link in the array
          if (filteredLinks.length && depth > 0) {
            const promises = filteredLinks.map(function(link, index) {
              return scrap(link, depth - 1);
            });

            Promise.all(promises)
            .then(() => {
              resolve(store);
            })
            .catch(error => {
              reject(error);
            });
          } else {
            resolve(store); // end searhing when depth condition is met or there're no links on the page
          }
        });
    })
    .catch( error => {
      console.log('error', error);

      // only show error to the user if it's the first page of the website
      if (depth == config.depth) {
        if (error.code == 'ENOTFOUND') {
          error.statusCode = 404;
          error.message = 'Site is not found';
        } else if (error.statusCode == 302) {
          error.message = 'Redirected 10 times. Aborting';
        }

        throw error;
      } else {
        return error;
      }
    });
  };
};

router.post('/scrap', function(req, res, next) {
  const website = req.body.website;
  const selector = req.body.selector;

  /* Error handling for user input */
  const err = new Error();
  err.status = 400;

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

  /* Initital setup */
  const scrap = scrapFactory(selector);
  /* Initital setup */

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
