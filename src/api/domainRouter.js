import { Router } from "express";
import DomainController from "../controllers/domainController";

const DomainRouter = new Router();

DomainRouter.route("/")
  .get(DomainController.index)
  .post(DomainController.create)
  .put(DomainController.update)
  .delete(DomainController.delete);

DomainRouter.route("/:id").get(DomainController.show);

export default DomainRouter;
