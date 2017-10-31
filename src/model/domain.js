import db from "../db";

class Domain {
  async getDomains() {
    return await db
      .select()
      .from("domains")
      .orderBy("domain", "asc");
  }

  async getDomainsForEmail(email) {
    const [, domain] = email.split("@");
    return await db
      .select()
      .from("domains")
      .where({ domain })
      .orderBy("domain", "asc");
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

  async updateDomain(fields, id) {
    return await db("domains")
      .update(fields, ["id", "domain"])
      .where({ id });
  }

  async deleteDomain(id) {
    return await db("domains")
      .delete(["id", "domain"])
      .where({ id });
  }
}

export default new Domain();
