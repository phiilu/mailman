import db from "../db";

class TlsPolicy {
  async getTlsPolicies() {
    return await db
      .select()
      .from("tlspolicies")
      .orderBy("domain", "asc");
  }

  async getTlsPolicy(id) {
    return await db
      .select()
      .from("tlspolicies")
      .where({ id })
      .limit(1);
  }

  async createTlsPolicy(fields) {
    return await db("tlspolicies").insert(fields);
  }

  async updateTlsPolicy(fields, id) {
    return await db("tlspolicies")
      .update(fields)
      .where({ id });
  }

  async deleteTlsPolicy(id) {
    return await db("tlspolicies")
      .delete()
      .where({ id });
  }
}

export default new TlsPolicy();
