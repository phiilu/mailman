import { isEmpty } from "lodash";
import Account from "../model/account";

import { isAdmin } from "../helpers/authorizationHelper";

class AccountController {
  async index(req, res) {
    if (isAdmin(req.user.email)) {
      const accounts = await Account.getAccounts();
      res.json({ accounts });
    } else {
      const accounts = await Account.getAccountsForEmail(req.user.email);
      res.json({ accounts });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    const account = (await Account.getAccount({ id }))[0];
    if (account) {
      if (
        !isAdmin(req.user.email) &&
        `${account.username}@${account.domain}` !== req.user.email
      )
        return res.status(403).json({
          message:
            "only admins and the user himself are allowed to view this account"
        });

      res.json({ account });
    } else {
      res.status(404).json({ message: "account not found" });
    }
  }

  async create(req, res) {
    const {
      username,
      domain,
      password,
      quota = 0,
      enabled = true,
      sendonly = false
    } = req.body;

    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to view all accounts" });

    if (!username || !domain || !password)
      return res.status(400).json({ message: "parameters are missing" });

    const id = (
      await Account.createAccount({
        username,
        domain,
        password,
        quota,
        enabled,
        sendonly
      })
    )[0];
    if (id) {
      res.json({ account: (await Account.getAccount({ id }))[0] });
    } else {
      const error = new Error("could not save account");
      error.status = 422;
      throw error;
    }
  }

  async update(req, res) {
    const { username, domain, password, quota, enabled, sendonly } = req.body;
    const { id } = req.params;

    const account = (await Account.getAccount({ id }))[0];
    if (
      !isAdmin(req.user.email) &&
      `${account.username}@${account.domain}` !== req.user.email
    )
      return res.status(403).json({
        message:
          "only admins and the user himself are allowed to update this account"
      });

    if (!req.body)
      return res.status(400).json({ message: "parameter are missing" });
    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    await Account.updateAccount(
      { username, domain, password, quota, enabled, sendonly },
      id
    );

    const updatedAccount = (await Account.getAccount({ id }))[0];
    if (!updatedAccount)
      return res.status(404).json({ message: "account not found" });

    res.json({ account: updatedAccount });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to view all accounts" });

    const rowsDeleted = await Account.deleteAccount(id);
    if (rowsDeleted === 0)
      return res.status(404).json({ message: "account not found" });
    return res.status(204).end();
  }

  async updatePassword(req, res) {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const account = (await Account.getAccount({ id }))[0];
    if (
      !isAdmin(req.user.email) &&
      `${account.username}@${account.domain}` !== req.user.email
    )
      return res.status(403).json({
        message:
          "only admins and the user himself are allowed to update the password"
      });

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "parameters are missing" });

    if (newPassword.length < 8) {
      return res
        .status(421)
        .json({ message: "new password must be at least 8 characters long" });
    }

    // check passwords
    const authenticated = await Account.comparePasswords(
      currentPassword,
      account.password
    );

    if (!authenticated) {
      return res.status(401).json({ message: "current password is incorrect" });
    }

    await Account.updateAccount({ password: newPassword }, id);
    res.json({ message: "password successfully changed" });
  }
}

export default new AccountController();
