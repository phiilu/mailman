import Express from "express";
import bodyParser from "body-parser";

import db from "./db";
import api from "./api";

const app = new Express();
const port = process.env.MAILMAN_PORT || 4000;

app.use(bodyParser.json());

app.use("/api", api);

const server = app.listen(port, () =>
  console.log(`Mailman is running on port ${port}`)
);
