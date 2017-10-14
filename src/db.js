import knex from "knex";

const db = knex({
  client: "maria",
  connection: {
    host: "127.0.0.1",
    user: process.env.MAILMAN_DB_USER,
    password: process.env.MAILMAN_DB_PASSWORD,
    db: process.env.MAILMAN_DB_DATABASE
  }
});

export default db;
