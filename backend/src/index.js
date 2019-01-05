import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

import createServer from "./createServer";

const server = createServer();

const app = server.express;
const port = process.env.PORT || process.env.MAILMAN_PORT || 4000;

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());

server.start({
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