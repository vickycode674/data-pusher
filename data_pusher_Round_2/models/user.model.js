const db = require("../config/db");

const createUser = async (user) => {
  return db("users").insert(user);
};

const findByEmail = async (email) => {
  return db("users").where({ email }).first();
};

module.exports = {
  createUser,
  findByEmail,
};
