import { Router } from "express";
import DomainRouter from "./domainRouter";

const api = new Router();

api.use("/domains", DomainRouter);

export default api;
