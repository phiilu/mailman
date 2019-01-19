import Account from "model/account";

const accountQueries = {
  async accounts(parent, args, ctx, info) {
    const { domain } = args;
    let accounts;

    if (domain) {
      accounts = await Account.getAccountsByDomain(domain);
    } else {
      accounts = await Account.getAccounts();
    }

    return accounts;
  },
  async accountsCount() {
    const count = await Account.getAccountCount();
    return count;
  }
};

export default accountQueries;
