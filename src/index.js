import "dotenv/config";
import Express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import RateLimit from "express-rate-limit";

import db from "./db";
import api from "./api";

import errorMiddleware from "./middlware/errorMiddleware";

const app = new Express();
const port = process.env.MAILMAN_PORT || 4000;
const base = process.env.MAILMAN_BASENAME || "/";
const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 100 request per IP
  delayMs: 0 // disabled
});

app.enable("trust proxy"); // only if you're behind a reverse proxy

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());

if (base.endsWith("/")) {
  app.use(base + "api", apiLimiter, api);
} else {
  app.use(base + "/api", apiLimiter, api);
}

if (process.env.NODE_ENV === "production") {
  app.use(base, Express.static(path.resolve("client", "build")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

app.use(errorMiddleware);

const server = app.listen(port, process.env.MAILMAN_HOST || "0.0.0.0", () =>
  console.log(
    "Mailman is running on http://%s:%d%s in %s mode",
    server.address().address,
    server.address().port,
    base,
    process.env.NODE_ENV
  )
);
