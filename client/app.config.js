import "dotenv/config";

export default {
  expo: {
    name: "Meal Mash",
    slug: "never-leftover-new",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/IconLight.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.sdsecureapp.neverleftovernew",
      icon: {
        light: "./assets/images/IconLight.png",
        dark: "./assets/images/IconDark.png",
      },
      statusBar: {
        translucent: true,
        style: "dark",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptivef.png",
        backgroundImage: "./assets/images/adaptiveb.png",
      },
      edgeToEdgeEnabled: true,
      package: "com.sdsecureapp.neverleftovernew",
      googleServicesFile: "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "single",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/iconround.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],

      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
        },
      ],

      "expo-font",
      "expo-web-browser",
      "expo-notifications",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      apiKey: process.env.EXPO_PUBLIC_API_KEY,
      router: {},
      eas: {
        projectId: "9636072c-a2d2-44ad-a599-4e8e66e84864",
      },
    },
  },
};
