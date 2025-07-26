const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@": "./", // resolve @/ to project root
};

module.exports = config;
