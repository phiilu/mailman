module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = "./src/index.js";
    config.resolve.modules = ["./src"];
    return config;
  }
};
