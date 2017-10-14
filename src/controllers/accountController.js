import { isEmpty } from "lodash";
import Account from "../model/account";

class AccountController {
  async index(req, res) {
    const accounts = await Account.getAccounts();
    res.json({ accounts });
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    const account = (await Account.getAccount({ id }))[0];
    if (account) {
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

    if (!username || !domain || !password)
      return res.status(400).json({ message: "parameters are missing" });

    const id = (await Account.createAccount({
      username,
      domain,
      password,
      quota,
      enabled,
      sendonly
    }))[0];
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

    if (!req.body)
      return res.status(400).json({ message: "parameter are missing" });
    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    await Account.updateAccount(
      { username, domain, password, quota, enabled, sendonly },
      id
    );

    const account = (await Account.getAccount({ id }))[0];
    if (!account) return res.status(404).json({ message: "account not found" });

    res.json({ account });
  }

  async delete(req, res) {
    const { id } = req.params;

    const rowsDeleted = await Account.deleteAccount(id);
    if (rowsDeleted === 0)
      return res.status(404).json({ message: "account not found" });
    return res.status(204).end();
  }
}

export default new AccountController();
