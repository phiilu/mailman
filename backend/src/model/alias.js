import db from "db";

class Alias {
  async getAliases() {
    return await db
      .select()
      .from("aliases")
      .orderBy("source_domain", "asc")
      .orderBy("source_username", "asc");
  }

  async getAliasesForEmail(email) {
    const [source_username, source_domain] = email.split("@");
    return await db
      .select()
      .from("aliases")
      .where({ source_username, source_domain })
      .orderBy("source_domain", "asc")
      .orderBy("source_username", "asc");
  }

  async getAliasCount() {
    const res = await db("aliases").count();
    const count = res[0]["count(*)"];
    return count;
  }

  async getAlias(fields) {
    return await db
      .select()
      .from("aliases")
      .where(fields)
      .limit(1);
  }

  async createAlias(fields) {
    return await db("aliases").insert(fields);
  }

  async updateAlias(id, fields) {
    return await db("aliases")
      .update(fields)
      .where({ id });
  }

  async deleteAlias(id) {
    return await db("aliases")
      .delete()
      .where({ id });
  }
}

export default new Alias();
