exports.up = function (knex) {
  return knex.schema.createTable("destinations", (table) => {
    table.increments("id").primary();
    table.integer("account_id").unsigned().references("account_id").inTable("accounts").onDelete("CASCADE");
    table.string("url").notNullable();
    table.string("method").notNullable();
    table.json("headers").notNullable(); // key-value header pairs
    table.integer("created_by").notNullable();
    table.integer("updated_by").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("destinations");
};
