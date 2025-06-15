exports.up = function (knex) {
  return knex.schema.createTable('account_members', function (table) {
    table.increments('id').primary();
    table.integer('account_id').unsigned().notNullable().references('id').inTable('accounts').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('role_id').unsigned().notNullable().references('id').inTable('roles').onDelete('CASCADE');
    table.timestamps(true, true); // created_at, updated_at
    table.integer('created_by');
    table.integer('updated_by');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('account_members');
};
