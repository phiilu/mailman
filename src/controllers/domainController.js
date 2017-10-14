import { isEmpty } from "lodash";
import Domain from "../model/domain";

import { isAdmin } from "../helpers/authorizationHelper";

class DomainController {
  async index(req, res) {
    if (!isAdmin(req.user.email))
      return res.status(403).json({ message: "insufficient permission" });

    const domains = await Domain.getDomains();
    res.json({ domains });
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    const domain = (await Domain.getDomain(id))[0];
    if (domain) {
      const [, userDomain] = req.user.email.split("@");
      // allow to view the domain if user is admin or belongs to this domain
      if (isAdmin(req.user.email) || userDomain === domain.domain) {
        res.json({ domain });
      } else {
        res.status(403).json({ message: "insufficient permission" });
      }
    } else {
      res.status(404).json({ message: "domain not found" });
    }
  }

  async create(req, res) {
    const { domain } = req.body;

    if (!domain)
      return res.status(400).json({ message: "parameter domain is missing" });
    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to create domains" });

    const id = (await Domain.createDomain(domain))[0];
    if (id) {
      res.json({ domain: (await Domain.getDomain(id))[0] });
    } else {
      const error = new Error("could not save domain");
      error.status = 422;
      throw error;
    }
  }

  async update(req, res) {
    const { domain } = req.body;
    const { id } = req.params;

    if (!domain)
      return res.status(400).json({ message: "parameter domain is missing" });
    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });
    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to update domains" });

    await Domain.updateDomain({ domain }, id);

    const updatedDomain = (await Domain.getDomain(id))[0];
    if (!updatedDomain)
      return res.status(404).json({ message: "domain not found" });

    res.json({ domain: updatedDomain });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to delete domains" });

    const rowsDeleted = await Domain.deleteDomain(id);
    if (rowsDeleted === 0)
      return res.status(404).json({ message: "domain not found" });
    return res.status(204).end();
  }
}

export default new DomainController();
