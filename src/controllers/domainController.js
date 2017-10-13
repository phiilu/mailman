import Domain from "../model/domain";

class DomainController {
  async index(req, res) {
    const domains = await Domain.getDomains().catch(error =>
      res.status(500).json({ error })
    );
    if (domains) res.json({ domains });
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    const domain = await Domain.getDomain(id).catch(error =>
      res.status(500).json({ error })
    );

    if (domain[0]) {
      res.json({ domain: domain[0] });
    } else {
      res.status(404).json({ message: "domain not found" });
    }
  }

  async create(req, res) {
    const { domain } = req.body;
    let error;

    if (!domain)
      return res.status(400).json({ message: "parameter domain is missing" });

    const savedDomain = await Domain.createDomain(domain).catch(
      err => (error = err)
    );
    if (error) return res.status(500).json({ error });

    const id = savedDomain[0];
    if (id) {
      res.json({ domain: await Domain.getDomain(id)[0] });
    } else {
      res.status(500).json({ message: "could not save domain" });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new DomainController();
