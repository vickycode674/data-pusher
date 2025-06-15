exports.up = function(knex) {
  return knex.schema.createTable('accounts', function(table) {
    table.increments('account_id').primary();
    table.string('account_name').notNullable();
    table.string('app_secret_token').notNullable();
    table.string('website');
    table.integer('created_by').unsigned().notNullable();
    table.integer('updated_by').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('accounts');
};
