import db from "db";
import crypto from "crypto";
import { sha512crypt } from "sha512crypt-node";

class Account {
  async getAccounts(pagination) {
    if (pagination) {
      return await db
        .select("id", "username", "domain", "quota", "enabled", "sendonly")
        .from("accounts")
        .orderBy("domain", "asc")
        .orderBy("username", "asc")
        .paginate(pagination.perPage, pagination.currentPage);
    }

    return await db
      .select("id", "username", "domain", "quota", "enabled", "sendonly")
      .from("accounts")
      .orderBy("domain", "asc")
      .orderBy("username", "asc");
  }

  async getAccountsByEmail(email) {
    const [username, domain] = email.split("@");
    return await db
      .select("id", "username", "domain", "quota", "enabled", "sendonly")
      .from("accounts")
      .where({ username, domain })
      .orderBy("domain", "asc")
      .orderBy("username", "asc");
  }

  async getAccountCount() {
    const res = await db("accounts").count();
    const count = res[0]["count(*)"];
    return count;
  }

  async getAccountsByDomain(domain, pagination) {
    if (pagination) {
      return await db
        .select("id", "username", "domain", "quota", "enabled", "sendonly")
        .from("accounts")
        .where({ domain })
        .orderBy("domain", "asc")
        .orderBy("username", "asc")
        .paginate(pagination.perPage, pagination.currentPage);
    }

    return await db
      .select("id", "username", "domain", "quota", "enabled", "sendonly")
      .from("accounts")
      .where({ domain })
      .orderBy("domain", "asc")
      .orderBy("username", "asc");
  }

  async getAccount(fields) {
    return await db
      .select()
      .from("accounts")
      .where(fields)
      .limit(1);
  }

  async createAccount(fields) {
    if (fields.password) {
      fields.password = this.hashPassword(fields.password);
    }
    return await db("accounts").insert(fields);
  }

  async updateAccount(id, fields) {
    if (fields.password) {
      fields.password = this.hashPassword(fields.password);
    }
    return await db("accounts")
      .update(fields)
      .where({ id });
  }

  async deleteAccount(id) {
    return await db("accounts")
      .delete()
      .where({ id });
  }

  randomSalt() {
    return crypto.randomBytes(64).toString("hex");
  }

  getSaltFromHash(hash) {
    // $6$24923bb9fc4a008d$D.aFhvUgjHL9RtXgTH8bDf9MS6MVVTBMMSLPON9OBzeMtVVUKnnrLBInjXNKCvGg5xZGDKFOX2Zhb/3mM7HYF0
    const [, , salt] = hash.split("$");
    return salt;
  }

  hashPassword(password, salt = this.randomSalt()) {
    return `{SHA512-CRYPT}${sha512crypt(password, salt)}`;
  }

  comparePasswords(plainPassword, hashPassword) {
    const salt = this.getSaltFromHash(hashPassword);
    const plainPasswordHash = this.hashPassword(plainPassword, salt);

    return plainPasswordHash === hashPassword;
  }
}

export default new Account();
