import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { View, ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const image =
    Platform.OS == "web"
      ? require("../assets/images/AppBackgroundDesktop.png")
      : require("../assets/images/AppBackground.png");
  const [loaded, error] = useFonts({
    Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Stack screenOptions={{ headerShown: false }}></Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
