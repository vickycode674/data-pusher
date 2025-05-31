const db = require('../db/connection');

const Account = {
    async create(account) {
        return db('accounts').insert(account);
    },

    async findByEmail(email) {
        return db('accounts').where({ email }).first();
    },

    async findById(id) {
        return db('accounts').where({ id }).first();
    },
    async delete(id) {
        return db('accounts').where({ id }).del();
    },

    async findByToken(token) {
        return db('accounts').where({ app_secret_token: token }).first();
    },

    async update(id,updates) {
        return db('accounts').where({ id }).update(updates);
    },
};

module.exports = Account;