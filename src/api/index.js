import { Router } from "express";
import jwt from "express-jwt";

import AuthenticationRouter from "./authenticationRouter";
import DomainRouter from "./domainRouter";
import AccountRouter from "./accountRouter";
import AliasRouter from "./aliasRouter";
import TlsPolicyRouter from "./tlspolicyRouter";

import { secret } from "../config";

const api = new Router();

api.use("/auth", AuthenticationRouter);
api.use("/domains", jwt({ secret }), DomainRouter);
api.use("/accounts", jwt({ secret }), AccountRouter);
api.use("/aliases", jwt({ secret }), AliasRouter);
api.use("/tlspolicies", jwt({ secret }), TlsPolicyRouter);

export default api;
