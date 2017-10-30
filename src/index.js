import "dotenv/config";
import Express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";

import db from "./db";
import api from "./api";

import errorMiddleware from "./middlware/errorMiddleware";

const app = new Express();
const port = process.env.MAILMAN_PORT || 4000;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api", api);

// This is fired every time the server side receives a request.
if (process.env.NODE_ENV === "production") {
  app.use(Express.static(path.resolve("client", "build")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

app.use(errorMiddleware);

const server = app.listen(port, () =>
  console.log(`Mailman is running on port ${port}`)
);
