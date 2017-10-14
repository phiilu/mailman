import db from "../db";

class Alias {
  async getAliases() {
    return await db
      .select()
      .from("aliases")
      .orderBy("source_domain", "asc")
      .orderBy("source_username", "asc");
  }

  async getAlias(id) {
    return await db
      .select()
      .from("aliases")
      .where({ id })
      .limit(1);
  }

  async createAlias(fields) {
    return await db("aliases").insert(fields);
  }

  async updateAlias(fields, id) {
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
