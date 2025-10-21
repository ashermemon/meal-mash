const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );

  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg"
  );
  config.resolver.sourceExts.push("svg");

  config.resolver.alias = {
    ...config.resolver.alias,
    "@": path.resolve(__dirname),
  };

  return config;
})();
