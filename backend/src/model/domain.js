import db from "../db";

class Domain {
  async getDomains() {
    return await db
      .select()
      .from("domains")
      .orderBy("domain", "asc");
  }

  async getDomainCount() {
    const res = await db("domains").count();
    const count = res[0]["count(*)"];
    return count;
  }

  async getDomainForEmail(email) {
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

  async updateDomain(id, domain) {
    const [oldDomain] = await this.getDomain(id);
    const [newId] = await this.createDomain(domain);

    // update the references where the domain is set
    await db("aliases")
      .update({ source_domain: domain })
      .where({ source_domain: oldDomain.domain });
    await db("accounts")
      .update({ domain })
      .where({ domain: oldDomain.domain });

    // delete the old domain
    await db("domains")
      .delete()
      .where({ id });
    // set the id back
    await db("domains")
      .update({ id })
      .where({ id: newId });

    return id;
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
