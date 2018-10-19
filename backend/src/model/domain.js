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
    const domain = await this.getDomain(id);

    await db("aliases")
      .delete()
      .where({ source_domain: domain[0].domain });
    await db("accounts")
      .delete()
      .where({ domain: domain[0].domain });
    return db("domains")
      .delete()
      .where({ id });
  }
}

export default new Domain();
