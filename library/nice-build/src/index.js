const path = require("path");
const projectRoot = process.cwd();

module.exports.default = function build() {
  const configPath = path.resolve(projectRoot, "nice-build.config.js");
  console.log("Loading config from", configPath);

  let config = require(configPath);
  console.log("Building with config", config);

  const plugins = config.plugins;

  if (plugins) {
    console.log("Processing plugins", plugins);

    const resolvedPlugins = config.plugins.map((plugin) => {
      if (typeof plugin === "string") {
        return require(plugin).default();
      } else {
        return plugin;
      }
    });

    resolvedPlugins.forEach((plugin) => {
      if (plugin.onConfig) {
        config = plugin.onConfig(config);
      }
    });
  }
  console.log("Resolved Config", config);
};
