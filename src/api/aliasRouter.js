import { Router } from "express";
import AliasController from "../controllers/aliasController";
import asyncMiddleware from "../middlware/asyncMiddleware";

const AliasRouter = new Router();

AliasRouter.route("/")
  .get(asyncMiddleware(AliasController.index))
  .post(asyncMiddleware(AliasController.create));

AliasRouter.route("/:id")
  .get(asyncMiddleware(AliasController.show))
  .put(asyncMiddleware(AliasController.update))
  .delete(asyncMiddleware(AliasController.delete));

export default AliasRouter;
