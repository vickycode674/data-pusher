const { v4: uuidv4 } = require('uuid');

exports.up = function (knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.string('id', 36).primary().defaultTo(uuidv4()); // use JS to generate UUID
    table.string('email').notNullable().unique();
    table.string('account_name').notNullable();
    table.string('website');
    table.string('app_secret_token').notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('accounts');
};
