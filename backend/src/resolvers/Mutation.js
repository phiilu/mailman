import Account from "../model/account";
import Domain from "../model/domain";

import DomainErrors from "./errors/DomainErrors";
import AccountErrors from "./errors/AccountErrors";

const Mutation = {
  async createAccount(parent, args, ctx, info) {
    const {
      username,
      domain,
      password,
      quota = 0,
      enabled = true,
      sendonly = false
    } = args.data;

    try {
      const [id] = await Account.createAccount({
        username,
        domain,
        password,
        quota,
        enabled,
        sendonly
      });
      return (await Account.getAccount({ id }))[0];
    } catch (error) {
      console.log(error);
      throw new AccountErrors.AccountNotCreatedError({
        data: { ...args.data }
      });
    }
  },
  async updateAccount(parent, args, ctx, info) {
    const { id, data } = args;
    try {
      await Account.updateAccount(id, data);
      const [account] = await Account.getAccount({ id });
      return account;
    } catch (error) {
      console.log(error);
      throw new AccountErrors.AccountNotUpdatedError({
        data: { ...args.data },
        internalData: {
          error
        }
      });
    }
  },
  async deleteAccount(parent, args, ctx, info) {
    const { id } = args;
    await Account.deleteAccount(id);

    return "Account deleted!";
  },
  async createDomain(parent, args, ctx, info) {
    const { domain } = args.data;

    const [domainExists] = await Domain.getDomain({ domain });
    if (domainExists) {
      throw new DomainErrors.DomainAlreadyExistsError();
    }

    try {
      const [id] = await Domain.createDomain(domain);
      return (await Domain.getDomain({ id }))[0];
    } catch (error) {
      throw new DomainErrors.DomainNotCreatedError({
        data: { domain, statusCode: 422 }
      });
    }
  },
  async updateDomain(parent, args, ctx, info) {
    const {
      id,
      data: { domain }
    } = args;

    try {
      const [newId] = await Domain.updateDomain(id, domain);
      return (await Domain.getDomain({ id: newId }))[0];
    } catch (error) {
      console.log(error);
      throw new DomainErrors.DomainNotUpdatedError({
        data: { id, domain, statusCode: 422 }
      });
    }
  },
  async deleteDomain(parent, args, ctx, info) {
    const { id } = args;
    await Domain.deleteDomain(id);

    return "Domain deleted!";
  }
};

export default Mutation;
