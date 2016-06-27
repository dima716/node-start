/* npm modules */
const request = require('supertest');
const nock = require('nock');
/* npm modules */

/* app modules */
const app = require('../app.js');
const config = require('../config');
const fixtureData = require('./fixtures/data');
const finishTest = require('./helpers/finish-test');
/* app modules */

describe('Scrap route', () => {
  var agent;
  var createData = (cb) => {
    agent
    .post('/scrap')
    .send(`website=${config.website}&selector=${config.selector}`)
    .end(cb);
  };

  beforeAll(() => {
    agent = request(app);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return a 200 status code', (done) => {
    createData(() => {
      agent
      .get('/data')
      .expect(200)
      .end(finishTest(done));
    });
  });

  it('should return JSON format', (done) => {
    createData(() => {
      agent
      .get('/data')
      .expect('Content-Type', /json/)
      .end(finishTest(done));
    });
  });

  it('should return result data', (done) => {
    createData(() => {
      agent
      .get('/data')
      .expect(fixtureData)
      .end(finishTest(done));
    });
  });
});
