import { isEmpty } from "lodash";
import Domain from "../model/domain";

class DomainController {
  async index(req, res) {
    const domains = await Domain.getDomains();
    res.json({ domains });
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    const domain = (await Domain.getDomain(id))[0];
    if (domain) {
      res.json({ domain: domain });
    } else {
      res.status(404).json({ message: "domain not found" });
    }
  }

  async create(req, res) {
    const { domain } = req.body;

    if (!domain)
      return res.status(400).json({ message: "parameter domain is missing" });

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
    const { fields } = req.body;
    const { id } = req.params;

    if (!fields)
      return res.status(400).json({ message: "parameter fields is missing" });
    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });
    if (isEmpty(fields))
      return res
        .status(400)
        .json({ message: "parameter fields can not be empty" });

    await Domain.updateDomain(fields, id);
    res.json({ domain: (await Domain.getDomain(id))[0] });
  }

  async delete(req, res) {
    const { id } = req.params;

    const rowsDeleted = await Domain.deleteDomain(id);
    if (rowsDeleted === 0)
      return res.status(404).json({ message: "domain not found" });
    return res.status(204).end();
  }
}

export default new DomainController();
