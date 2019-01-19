import validate from "validate.js";

import Account from "model/account";
import AccountErrors from "resolvers/errors/AccountErrors";

const constraints = {
  username: {
    presence: { allowEmpty: false }
  },
  email: {
    length: {
      minimum: 1
    },
    email: {
      message: "is not valid"
    }
  },
  password: {
    presence: { allowEmpty: false },
    length: { minimum: 8 }
  }
};

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

    // Validation
    const notValid = validate(
      { username, email: `${username}@${domain}`, password },
      constraints
    );
    if (notValid) {
      throw new AccountErrors.AccountValidationError({
        data: notValid
      });
    }

    try {
      const [id] = await Account.createAccount({
        username: username.trim(),
        domain: domain.trim(),
        password: password.trim(),
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
    const { username, domain, password } = data;

    // Validation
    const [oldAccount] = await Account.getAccount({ id });
    let notValid = null;
    if (username || username === "") {
      data.username = username.trim();
      notValid = validate(
        {
          username: data.username,
          email: `${data.username}@${domain ? domain : oldAccount.domain}`
        },
        {
          username: {
            presence: { allowEmpty: false }
          },
          email: {
            length: {
              minimum: 1
            },
            email: {
              message: "is not valid"
            }
          }
        }
      );
    }
    if (password || password === "") {
      data.password = password.trim();
      notValid = validate(
        { password: data.password },
        {
          password: {
            presence: { allowEmpty: false },
            length: { minimum: 8 }
          }
        }
      );
    }

    if (notValid) {
      throw new AccountErrors.AccountValidationError({
        data: notValid
      });
    }

    try {
      await Account.updateAccount(id, data);
      const [account] = await Account.getAccount({ id });
      return account;
    } catch (error) {
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
