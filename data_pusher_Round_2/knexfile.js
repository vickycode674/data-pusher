module.exports = {
  development: {
    client: process.env.DB_CLIENT || "sqlite3",
    connection: {
      filename: process.env.DB_CONNECTION || "./dev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};
