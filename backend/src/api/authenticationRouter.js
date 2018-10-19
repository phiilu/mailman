import { Router } from "express";
import AuthenticationController from "../controllers/authenticationController";
import asyncMiddleware from "../middlware/asyncMiddleware";

const AuthenticationRouter = new Router();

AuthenticationRouter.post(
  "/authenticate",
  asyncMiddleware(AuthenticationController.authenticate)
);

export default AuthenticationRouter;
