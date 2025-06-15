const knex = require("../config/db");

const Destination = {
  create: (data) => knex("destinations").insert(data),
  findByAccount: (accountId) => knex("destinations").where({ account_id: accountId }),
  delete: (id) => knex("destinations").where({ id }).del(),
};

module.exports = Destination;
