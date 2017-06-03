process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const path = require('path');

const server = require('../lib/server')(path.join(__dirname, 'markdown'));

describe('server', () => {

  beforeEach( (done) => {
    done();
  });

  afterEach( (done) => {
    done();
  });

  describe('GET unknown file', () => {
    it('it should return 404', (done) => {
      chai.request(server)
        .get('/file.md')
        .end( (err, res) => {
          res.status.should.equal(404);
          done();
        });
    });
  });

  describe('GET existing markdown', () => {
    it('it should return rendered file', (done) => {
      chai.request(server)
        .get('/test.md')
        .end( (err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<h1>Test</h1>');
          res.text.should.contain('<p><strong>Hello</strong> test.</p>');
          done();
        });
    });
  })

});
