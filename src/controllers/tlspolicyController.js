import { isEmpty } from "lodash";
import TlsPolicy from "../model/tlspolicy";
import { isAdmin } from "../helpers/authorizationHelper";

class TlsPolicyController {
  async index(req, res) {
    if (isAdmin(req.user.email)) {
      const tlspolicies = await TlsPolicy.getTlsPolicies();
      res.json({ tlspolicies });
    } else {
      res.json({ tlspolicies: [] });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to view tls policies" });

    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    const tlspolicy = (await TlsPolicy.getTlsPolicy(id))[0];
    if (tlspolicy) {
      res.json({ tlspolicy });
    } else {
      res.status(404).json({ message: "tlspolicy not found" });
    }
  }

  async create(req, res) {
    const { domain, policy, params } = req.body;

    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to create tls policies" });

    if (!domain || !policy)
      return res.status(400).json({ message: "parameters are missing" });

    const id = (await TlsPolicy.createTlsPolicy({ domain, policy, params }))[0];
    if (id) {
      res.json({ tlspolicy: (await TlsPolicy.getTlsPolicy(id))[0] });
    } else {
      const error = new Error("could not save tlspolicy");
      error.status = 422;
      throw error;
    }
  }

  async update(req, res) {
    const { domain, policy, params } = req.body;
    const { id } = req.params;

    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to update tls policies" });

    if (isEmpty(req.body))
      return res.status(400).json({ message: "parameters are missing" });
    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    await TlsPolicy.updateTlsPolicy({ domain, policy, params }, id);

    const tlspolicy = (await TlsPolicy.getTlsPolicy(id))[0];
    if (!tlspolicy)
      return res.status(404).json({ message: "tlspolicy not found" });

    res.json({ tlspolicy });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to delete tls policies" });

    const rowsDeleted = await TlsPolicy.deleteTlsPolicy(id);
    if (rowsDeleted === 0)
      return res.status(404).json({ message: "tlspolicy not found" });
    return res.status(204).end();
  }
}

export default new TlsPolicyController();
