import "dotenv/config";
import Express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import createServer from "./createServer";

const server = createServer();

const app = server.express;
const port = process.env.PORT || process.env.MAILMAN_PORT || 4000;
const base = process.env.MAILMAN_BASENAME || "/";

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use(base, Express.static(path.resolve("client", "build")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.MAILMAN_FRONTEND_URL
    },
    port: port
  },
  () => {
    deets => {
      console.log(
        `Mailman is now running on port http://localhost:${deets.port}`
      );
    };
  }
);
