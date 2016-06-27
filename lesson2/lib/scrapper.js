/* npm modules */
const parse = require('url-parse');
const cheerio = require('cheerio');
const got = require('got');
/* npm modules */

/* app modules */
const config = require('../config');
const utils = require('./utils');
/* app modules */

module.exports = function scrapperFactory(selector) {
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

          // getting content of found elements
          content = elements.map( (index, element) => {
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

              if ( utils.isLinkValid(linkHref, linkObject.hostname, websiteObject.hostname) ) {
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
