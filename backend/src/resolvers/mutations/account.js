import validate from "validate.js";
import jwt from "jsonwebtoken";

import Account from "model/account";
import AccountErrors from "resolvers/errors/AccountErrors";
import PermissionErrors from "resolvers/errors/PermissionErrors";

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
  async login(parent, args, ctx, info) {
    const { email, password } = args;
    // 1. check if there is a user with that email
    const [account] = await Account.getAccountByEmail(email);
    if (!account) {
      throw new AccountErrors.AccountNotFoundError({ data: { email } });
    }
    // 2. Check if their password is correct
    const valid = Account.comparePasswords(password, account.password);
    if (!valid) {
      throw new AccountErrors.AccountInvalidPasswordError({ data: { email } });
    }
    // 3. generate the JWT Token
    const token = jwt.sign(
      { accountId: account.id },
      process.env.MAILMAN_SECRET
    );
    // 4. Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 5. Return the user
    return account;
  },
  logout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return "Goodbye!";
  },
  async createAccount(parent, args, ctx, info) {
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const {
      username,
      domain,
      password,
      quota = 0,
      enabled = true,
      sendonly = false
    } = args.data;

    console.log(args.data);

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

    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

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
    if (!ctx.request.isAdmin) {
      throw new PermissionErrors.PermissionInsufficient({
        internalData: {
          args,
          info
        }
      });
    }

    const { id } = args;
    await Account.deleteAccount(id);

    return "Account deleted!";
  }
};

export default accountMutations;
