import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { formatError } from "apollo-errors";

import { setAccountId, setAccount, isAdmin } from "middleware/auth";
import createServer from "./createServer";

const server = createServer();

const app = server.express;
const port = process.env.PORT || process.env.MAILMAN_PORT || 4000;

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());

// Auth Middleware
app.use(setAccountId);
app.use(setAccount);
app.use(isAdmin);

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.MAILMAN_FRONTEND_URL
    },
    port: port,
    formatError
  },
  () => {
    deets => {
      console.log(
        `Mailman is now running on port http://localhost:${deets.port}`
      );
    };
  }
);
