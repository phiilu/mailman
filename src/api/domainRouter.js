import { Router } from "express";
import DomainController from "../controllers/domainController";
import asyncMiddleware from "../middlware/asyncMiddleware";

const DomainRouter = new Router();

DomainRouter.route("/")
  .get(asyncMiddleware(DomainController.index))
  .post(asyncMiddleware(DomainController.create));

DomainRouter.route("/:id")
  .get(asyncMiddleware(DomainController.show))
  .put(asyncMiddleware(DomainController.update))
  .delete(asyncMiddleware(DomainController.delete));

export default DomainRouter;
