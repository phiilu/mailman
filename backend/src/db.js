import KnexQueryBuilder from "knex/lib/query/builder";
import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: process.env.MAILMAN_DB_HOST || "127.0.0.1",
    user: process.env.MAILMAN_DB_USER,
    password: process.env.MAILMAN_DB_PASSWORD,
    database: process.env.MAILMAN_DB_DATABASE
  }
});

KnexQueryBuilder.prototype.paginate = function(per_page, skip) {
  const clone = this.clone();

  return Promise.all([
    this.offset(skip).limit(per_page),
    db.count("*").from(clone.as("t1"))
  ]).then(([rows, total]) => {
    const count = parseInt(total.length > 0 ? total[0]["count(*)"] : 0);
    return {
      total: count,
      per_page: per_page,
      offset: skip,
      to: skip + rows.length,
      last_page: Math.ceil(count / per_page),
      // current_page: page,
      from: skip,
      data: rows
    };
  });
};

db.queryBuilder = function() {
  return new KnexQueryBuilder(db.client);
};

export default db;
