import Account from "model/account";
import AccountErrors from "resolvers/errors/AccountErrors";

const accountQueries = {
  async accounts(parent, args, ctx, info) {
    const { domain, pagination } = args;
    let accounts;

    if (domain) {
      accounts = await Account.getAccountsByDomain(domain, pagination);
    } else {
      accounts = await Account.getAccounts(pagination);
    }

    return accounts;
  },
  async account(parent, args, ctx, info) {
    const { id } = args;
    const [account] = await Account.getAccount({ id });

    if (!account) {
      throw new AccountErrors.AccountNotFoundError({ data: { id } });
    }

    return account;
  },
  async accountsCount() {
    const count = await Account.getAccountCount();
    return count;
  }
};

export default accountQueries;
