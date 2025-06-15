const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // adjust if your entry file path is different
const knex = require('../config/db');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Destination Routes', () => {
  let testAccountId;

  before(async () => {
    // Create a test account to reference
    const [accountId] = await knex('accounts').insert({
      account_name: 'Test Account',
      website: 'https://testaccount.com',
      created_by: 1,
      updated_by: 1
    });

    testAccountId = accountId;
  });

  after(async () => {
    // Clean up test destinations and accounts
    await knex('destinations').del();
    await knex('accounts').del();
  });

  it('should create a new destination', (done) => {
    chai
      .request(app)
      .post('/api/destinations')
      .send({
        account_id: testAccountId,
        url: 'https://webhook.site/test',
        method: 'POST',
        headers: { Authorization: 'Bearer test' }, // Note: JSON object — your controller must handle this correctly
        created_by: 1,
        updated_by: 1
      })
      .end((err, res) => {
        console.log('Response body:', res.body); // for debugging
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('success', true);
        done();
      });
  });

  it('should return all destinations', (done) => {
    chai
      .request(app)
      .get('/api/destinations')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
