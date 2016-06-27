/* npm modules */
const scrapper = require('../lib/scrapper');
const config = require('../config');
const fixtureData = require('./fixtures/data.json');
/* npm modules */

/* app modules */
const jasmine = require('jasmine');
const nock = require('nock');
/* app modules */

describe('Scrapper', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // store is a hash which looks like { 'http://test.com': ['text', 'text1'], 'http://test.com/anotherpage': ['text2', 'text3']}
  it('should return store with results', (done) => {
    const scrap = scrapper(config.selector);

    scrap(config.website, config.depth)
    .then((store) => {
      expect(store).toEqual(fixtureData);
      done();
    })
    .catch(error => {
      console.log('Error in scrap spec:');
      console.log(error);
    });
  });

  it('should validate existense of website', (done) => {
    const scrap = scrapper(config.selector);

    scrap('foo', config.depth)
    .catch(error => {
      expect(error.message).toBe('Site is not found');
      expect(error.statusCode).toBe(404);
      done();
    });
  });
});
