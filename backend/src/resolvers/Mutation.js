import Account from "../model/account";
import Domain from "../model/domain";

const Mutation = {
  async createAccount(parent, args, ctx, info) {
    const {
      email,
      password,
      quota = 0,
      enabled = true,
      sendonly = false
    } = args;

    let { username, domain } = args;

    if (email) {
      username = email.split("@")[0];
      domain = email.split("@")[1];
    }

    const id = (await Account.createAccount({
      username,
      domain,
      password,
      quota,
      enabled,
      sendonly
    }))[0];
    if (id) {
      return (await Account.getAccount({ id }))[0];
    } else {
      const error = new Error("could not save account");
      error.status = 422;
      throw error;
    }
  },
  async updateAccount(parent, args, ctx, info) {
    const userFields = { ...args };
    const { id } = args;
    delete userFields.id;

    await Account.updateAccount(userFields, id);
    const account = (await Account.getAccount({ id }))[0];
    console.log(account);

    return account;
  },
  async deleteAccount(parent, args, ctx, info) {
    const { id } = args;
    await Account.deleteAccount(id);

    return "Account deleted!";
  },
  async createDomain(parent, args, ctx, info) {
    const { domain } = args;

    const id = (await Domain.createDomain(domain))[0];
    if (id) {
      return (await Domain.getDomain(id))[0];
    } else {
      const error = new Error("could not save domain");
      error.status = 422;
      throw error;
    }
  },
  async updateDomain(parent, args, ctx, info) {
    const { id, domain } = args;

    const newId = await Domain.updateDomain(id, domain);
    if (newId) {
      return (await Domain.getDomain(newId))[0];
    } else {
      const error = new Error("could not update domain");
      error.status = 422;
      throw error;
    }
  },
  async deleteDomain(parent, args, ctx, info) {
    const { id } = args;
    await Domain.deleteDomain(id);

    return "Domain deleted!";
  }
};

export default Mutation;
