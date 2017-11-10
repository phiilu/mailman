import "dotenv/config";
import Express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import RateLimit from "express-rate-limit";

import db from "./db";
import api from "./api";

import errorMiddleware from "./middlware/errorMiddleware";

const app = new Express();
const port = process.env.MAILMAN_PORT || 4000;
const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 request per IP
  delayMs: 0 // disabled
});

app.enable("trust proxy"); // only if you're behind a reverse proxy

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api", apiLimiter, api);

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
