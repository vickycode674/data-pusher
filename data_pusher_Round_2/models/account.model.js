const knex = require("../config/db");

const Account = {
  async create(data) {
    return await knex("accounts").insert(data);
  },

  async findById(id) {
    return await knex("accounts").where({ account_id: id }).first();
  },

  async findAll() {
    return await knex("accounts");
  },

  async update(id, data) {
    return await knex("accounts").where({ account_id: id }).update(data);
  },

  async delete(id) {
    return await knex("accounts").where({ account_id: id }).del();
  }
};

module.exports = Account;
