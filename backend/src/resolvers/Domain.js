import Account from "../model/account";

const DomainResolver = {
  async accounts(parent, args, ctx, info) {
    const accounts = await Account.getAccountsByDomain(parent.domain);
    return accounts;
  }
};

export default DomainResolver;
