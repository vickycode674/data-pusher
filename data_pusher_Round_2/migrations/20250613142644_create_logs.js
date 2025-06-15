exports.up = function (knex) {
  return knex.schema.createTable("logs", (table) => {
    table.increments("id").primary();
    table.string("event_id").unique().notNullable();
    table.integer("account_id").unsigned().references("account_id").inTable("accounts").onDelete("CASCADE");
    table.integer("destination_id").unsigned().references("id").inTable("destinations").onDelete("CASCADE");
    table.timestamp("received_timestamp").defaultTo(knex.fn.now());
    table.timestamp("processed_timestamp");
    table.json("received_data");
    table.string("status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("logs");
};
