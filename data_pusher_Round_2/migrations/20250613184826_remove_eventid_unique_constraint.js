exports.up = function (knex) {
  return knex.schema.alterTable("logs", (table) => {
    table.dropUnique("event_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("logs", (table) => {
    table.unique("event_id");
  });
};
