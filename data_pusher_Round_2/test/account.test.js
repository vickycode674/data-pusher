const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Make sure this points to your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('Basic Test Setup', () => {
  it('should confirm the test setup works', (done) => {
    chai.request(app)
      .get('/') // Make sure this route exists in your app
      .end((err, res) => {
        expect(res).to.have.status(200); // or the correct status
        done();
      });
  });

it('should create a new account', (done) => {
  chai.request(app)
    .post('/api/accounts')
    .send({
      account_name: 'Test Account',
      website: 'https://test.com'
    })
    .end((err, res) => {
      console.log("✅ Response body:", res.body);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('success', true);
      done();
    });
    
 it('should return all accounts', (done) => {
    chai.request(app)
      .get('/api/accounts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.success).to.be.true;
        done();
      });
  });
});
});
