import db from "../db";

class Domain {
  async getDomains() {
    return await db.select().from("domains");
  }

  async getDomain(id) {
    return await db
      .select()
      .from("domains")
      .where({ id })
      .limit(1);
  }

  async createDomain(domain) {
    return await db("domains").insert({ domain }, ["id", "domain"]);
  }

  async updateDomain(fields) {
    return await db("domains").update(fields, ["id", "domain"]);
  }

  async deleteDomain(id) {
    return await db("domains")
      .delete(["id", "domain"])
      .where({ id });
  }
}

export default new Domain();
