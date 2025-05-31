const db = require('../db/connection');

const Destination = {
  async create(destination) {
    return db('destinations').insert(destination);
  },

  async findById(id) {
    return db('destinations').where({ id }).first();
  },

  async findByAccountId(account_id) {
    return db('destinations').where({ account_id });
  },

  async update(id, updates) {
    return db('destinations').where({ id }).update(updates);
  },

  async delete(id) {
    return db('destinations').where({ id }).del();
  },

  async deleteByAccountId(account_id) {
  return db('destinations').where({ account_id }).del();
},

};

module.exports = Destination;
