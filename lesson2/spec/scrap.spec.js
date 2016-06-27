/* npm modules */
const request = require('supertest');
const nock = require('nock');
/* npm modules */

/* app modules */
const app = require('../app.js');
const config = require('../config');
const finishTest = require('./helpers/finish-test');
/* app modules */


describe('Scrap route', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return a 200 status code', (done) => {
    request(app)
    .post('/scrap')
    .send(`website=${config.website}&selector=${config.selector}`)
    .expect(200)
    .end(finishTest(done));
  });

  it('should return JSON format', (done) => {
    request(app)
    .post('/scrap')
    .send(`website=${config.website}&selector=${config.selector}`)
    .expect('Content-Type', /json/)
    .end(finishTest(done));
  });

  it('should return a path to the result data', (done) => {
    request(app)
    .post('/scrap')
    .send(`website=${config.website}&selector=${config.selector}`)
    .expect(/data/i)
    .end(finishTest(done));
  });

  it('should validate empty website field', (done) => {
    request(app)
    .post('/scrap')
    .send(`website=&selector=${config.selector}`)
    .expect(/website field is empty/i)
    .end(finishTest(done));
  });

  it('should validate empty selector field', (done) => {
    request(app)
    .post('/scrap')
    .send(`website=${config.website}&selector=`)
    .expect(/selector field is empty/i)
    .end(finishTest(done));
  });

  it('should validate type of website field', (done) => {
    request(app)
    .post('/scrap')
    .send(`website=123&selector=${config.selector}`)
    .expect(/website field should be a string/i)
    .end(finishTest(done));
  });

  it('should validate type of selector field', (done) => {
    request(app)
    .post('/scrap')
    .send(`website=${config.website}&selector=123`)
    .expect(/selector field should be a string/i)
    .end(finishTest(done));
  });
});
