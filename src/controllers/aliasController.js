import { isEmpty } from "lodash";
import Alias from "../model/alias";

import { isAdmin } from "../helpers/authorizationHelper";

class AliasController {
  async index(req, res) {
    if (!isAdmin(req.user.email))
      return res
        .status(403)
        .json({ message: "only admins are allowed to view all aliases" });

    const aliases = await Alias.getAliases();
    res.json({ aliases });
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    const alias = (await Alias.getAlias(id))[0];
    if (alias) {
      const [, domain] = req.user.email.split("@");
      if (!isAdmin(req.user.email) && alias.source_domain !== domain)
        return res.status(403).json({
          message:
            "only admins and the user who this alias belongs to are allowed to view this alias"
        });

      res.json({ alias });
    } else {
      res.status(404).json({ message: "alias not found" });
    }
  }

  async create(req, res) {
    const {
      source_username,
      source_domain,
      destination_username,
      destination_domain,
      enabled = true
    } = req.body;

    if (
      !source_username ||
      !source_domain ||
      !destination_username ||
      !destination_domain
    )
      return res.status(400).json({ message: "parameters are missing" });

    const [, domain] = req.user.email.split("@");
    if (!isAdmin(req.user.email) && source_domain !== domain)
      return res.status(403).json({
        message:
          "only admins can create aliases for other domains than the one he belongs to"
      });

    const id = (await Alias.createAlias({
      source_username,
      source_domain,
      destination_username,
      destination_domain,
      enabled
    }))[0];
    if (id) {
      res.json({ alias: (await Alias.getAlias(id))[0] });
    } else {
      const error = new Error("could not save alias");
      error.status = 422;
      throw error;
    }
  }

  async update(req, res) {
    const {
      source_username,
      source_domain,
      destination_username,
      destination_domain,
      enabled
    } = req.body;
    const { id } = req.params;

    if (isEmpty(req.body))
      return res.status(400).json({ message: "parameters are missing" });
    if (!id)
      return res.status(400).json({ message: "parameter id is missing" });

    const [, domain] = req.user.email.split("@");
    if (!isAdmin(req.user.email) && source_domain !== domain)
      return res.status(403).json({
        message:
          "only admins can update aliases for other domains than the one he belongs to"
      });

    await Alias.updateAlias(
      {
        source_username,
        source_domain,
        destination_username,
        destination_domain,
        enabled
      },
      id
    );

    const alias = (await Alias.getAlias(id))[0];
    if (!alias) return res.status(404).json({ message: "alias not found" });

    res.json({ alias });
  }

  async delete(req, res) {
    const { id } = req.params;

    const alias = (await Alias.getAlias(id))[0];
    if (!alias) return res.status(404).json({ message: "alias not found" });

    const [, domain] = req.user.email.split("@");
    if (!isAdmin(req.user.email) && alias.source_domain !== domain)
      return res.status(403).json({
        message:
          "only admins can delete aliases for other domains than the one he belongs to"
      });

    await Alias.deleteAlias(id);

    return res.status(204).end();
  }
}

export default new AliasController();
