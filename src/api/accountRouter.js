import { Router } from "express";
import AccountController from "../controllers/accountController";
import asyncMiddleware from "../middlware/asyncMiddleware";

const AccountRouter = new Router();

AccountRouter.route("/")
  .get(asyncMiddleware(AccountController.index))
  .post(asyncMiddleware(AccountController.create));

AccountRouter.route("/:id")
  .get(asyncMiddleware(AccountController.show))
  .put(asyncMiddleware(AccountController.update))
  .delete(asyncMiddleware(AccountController.delete));

export default AccountRouter;
