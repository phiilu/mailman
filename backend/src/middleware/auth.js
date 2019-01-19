import jwt from "jsonwebtoken";
import Account from "model/account";

const ADMINS = process.env.MAILMAN_ADMIN.split(",");

// decode the JWT so we can get the account Id on each request
export const setAccountId = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { accountId } = jwt.verify(token, process.env.MAILMAN_SECRET);
    // put the accountId onto the req for future requests to access
    req.accountId = accountId;
  }
  next();
};

// set the logged in Account
export const setAccount = async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.accountId) return next();

  const [account] = await Account.getAccount({ id: req.accountId });
  req.account = account;
  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.account) return next();

  const { username, domain } = req.account;
  const email = `${username}@${domain}`;
  req.isAdmin = ADMINS.includes(email);
  next();
};
