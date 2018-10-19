const os = require("os");
const env = require("dotenv").config();

const cores = os.cpus().length;

module.exports = {
  apps: [
    {
      name: "mailman",
      script: "build/main.js",
      env: env.parsed,
      watch: ["build", "client/build"],
      ignore_watch: ["node_modules"],
      watch_options: {
        followSymlinks: false
      },
      instances: cores,
      exec_mode: "cluster"
    }
  ]
};
