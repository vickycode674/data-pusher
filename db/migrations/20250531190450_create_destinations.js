const { v4: uuidv4 } = require('uuid');

exports.up = function (knex) {
  return knex.schema.createTable('destinations', (table) => {
    table.string('id', 36).primary().defaultTo(uuidv4()); // UUID as string
    table.string('account_id', 36).notNullable();
    table.string('url').notNullable();
    table.string('http_method').notNullable();
    table.text('headers').notNullable(); // store JSON as TEXT

    table.foreign('account_id').references('accounts.id').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('destinations');
};
