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

    const [username, domain] = email.split("@");

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
  }
};

export default Mutation;
