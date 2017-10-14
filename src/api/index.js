import { Router } from "express";

import AuthenticationRouter from "./authenticationRouter";
import DomainRouter from "./domainRouter";
import AccountRouter from "./accountRouter";
import AliasRouter from "./aliasRouter";
import TlsPolicyRouter from "./tlspolicyRouter";

const api = new Router();

api.use("/auth", AuthenticationRouter);
api.use("/domains", DomainRouter);
api.use("/accounts", AccountRouter);
api.use("/aliases", AliasRouter);
api.use("/tlspolicies", TlsPolicyRouter);

export default api;
