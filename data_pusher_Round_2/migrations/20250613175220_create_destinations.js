exports.up = function (knex) {
  return knex.schema.createTable("destinations", (table) => {
    table.increments("id").primary(); // Primary key
    table
      .integer("account_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE");
    table.string("url").notNullable(); // Destination webhook URL
    table.string("method").notNullable(); // HTTP method
    table.json("headers").notNullable(); // Custom headers
    table.integer("created_by").notNullable(); // user ID
    table.integer("updated_by").notNullable(); // user ID
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("destinations");
};
