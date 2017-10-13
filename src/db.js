import knex from "knex";

const db = knex({
  client: "maria",
  connection: {
    host: "127.0.0.1",
    user: "vmail",
    password: "vmail",
    db: "vmail"
  }
});

export default db;
