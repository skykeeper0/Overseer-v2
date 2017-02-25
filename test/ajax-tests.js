// const mocha = require('mocha');
const request = require('supertest');
const app = require('../server/server.js');
const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

describe('Ajax calls', () => {
  describe('GET', () => {
    it('Should be able to get projects from DB', (done) => {
      request(HOST)
          .get('/get_projects')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

    it('Should be able to get tasks from DB', (done) => {
      request(HOST)
        .get('/get_tasks/1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
