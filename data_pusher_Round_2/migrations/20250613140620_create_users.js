exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true); // created_at & updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
