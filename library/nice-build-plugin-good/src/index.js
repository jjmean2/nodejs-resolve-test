module.exports.name = "nice-build-plugin-good";
module.exports.default = function () {
  return {
    onConfig: function (config) {
      config.name += "-good";
      return config;
    },
  };
};
