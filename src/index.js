import Express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import db from "./db";
import api from "./api";

import errorMiddleware from "./middlware/errorMiddleware";

const app = new Express();
const port = process.env.MAILMAN_PORT || 4000;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api", api);
app.use(errorMiddleware);

const server = app.listen(port, () =>
  console.log(`Mailman is running on port ${port}`)
);
