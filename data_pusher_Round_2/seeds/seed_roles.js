exports.seed = async function (knex) {
  await knex("roles").del();
  await knex("roles").insert([
    { id: 1, role_name: "Admin" },
    { id: 2, role_name: "Normal" }
  ]);
};
