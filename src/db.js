import knex from "knex";

const connection = {
  user: process.env.MAILMAN_DB_USER,
  password: process.env.MAILMAN_DB_PASSWORD,
  database: process.env.MAILMAN_DB_DATABASE
};

if (process.env.MAILMAN_DB_SOCKET) {
  connection.socketPath = process.env.MAILMAN_DB_SOCKET;
} else {
  connection.host = process.env.MAILMAN_DB_HOST || "127.0.0.1";
  connection.port = parseInt(process.env.MAILMAN_DB_PORT, 10) || 3306;
}

let engine = process.env.MAILMAN_DB_ENGINE;
// workaround to support old settings:
if (engine === "maria") {
  engine = "mysql";
}

const db = knex({
  client: engine || "mysql",
  connection
});

export default db;
