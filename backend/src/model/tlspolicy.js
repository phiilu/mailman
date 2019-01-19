import db from "db";

class TlsPolicy {
  async getTlsPolicies() {
    return await db
      .select()
      .from("tlspolicies")
      .orderBy("domain", "asc");
  }

  async getTlsPolicy(fields) {
    return await db
      .select()
      .from("tlspolicies")
      .where(fields)
      .limit(1);
  }

  async getTlsPolicyCount() {
    const res = await db("tlspolicies").count();
    const count = res[0]["count(*)"];
    return count;
  }

  async createTlsPolicy(fields) {
    return await db("tlspolicies").insert(fields);
  }

  async updateTlsPolicy(id, fields) {
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
