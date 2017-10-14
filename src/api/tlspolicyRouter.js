import { Router } from "express";
import TlsPolicyController from "../controllers/tlspolicyController";
import asyncMiddleware from "../middlware/asyncMiddleware";

const TlsPolicyRouter = new Router();

TlsPolicyRouter.route("/")
  .get(asyncMiddleware(TlsPolicyController.index))
  .post(asyncMiddleware(TlsPolicyController.create));

TlsPolicyRouter.route("/:id")
  .get(asyncMiddleware(TlsPolicyController.show))
  .put(asyncMiddleware(TlsPolicyController.update))
  .delete(asyncMiddleware(TlsPolicyController.delete));

export default TlsPolicyRouter;
