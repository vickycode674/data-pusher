const knex = require("../config/db");

const Log = {
  create: (data) => knex("logs").insert(data),
  findByAccount: (account_id) => knex("logs").where({ account_id }),
};

module.exports = Log;
