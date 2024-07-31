// config-overrides.js
const { override, devServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  config.allowedHosts = ['localhost'];
  return config;
};

module.exports = {
  webpack: override(),
  devServer: override(devServerConfig()),
};
