import Account from "model/account";
import AccountErrors from "resolvers/errors/AccountErrors";

const accountQueries = {
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.accountId) {
      return null;
    }
    return ctx.request.account;
  },
  async accounts(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

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
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const { id } = args;
    const [account] = await Account.getAccount({ id });

    if (!account) {
      throw new AccountErrors.AccountNotFoundError({ data: { id } });
    }

    return account;
  },
  async accountsCount(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const count = await Account.getAccountCount();
    return count;
  }
};

export default accountQueries;
