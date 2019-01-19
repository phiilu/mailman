import Account from "model/account";
import AccountErrors from "resolvers/errors/AccountErrors";

const accountMutations = {
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
  }
};

export default accountMutations;
