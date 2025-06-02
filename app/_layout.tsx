import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Platform, StatusBar } from "react-native";
import { View, ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { COLORS } from "@/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { storage } from "./components/storage";
import FavoritesContext from "./contexts/FavoritesContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const image =
    Platform.OS == "web"
      ? require("../assets/images/AppBackgroundDesktop.png")
      : require("../assets/images/AppBackground.png");

  const [loaded, error] = useFonts({
    "Nunito-ExtraLight": require("../assets/fonts/Nunito-Weights/Nunito-ExtraLight.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito-Weights/Nunito-Light.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Weights/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Weights/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-Weights/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Weights/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-Weights/Nunito-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  useEffect(() => {
    const storedFavoritesString = storage.getString("favorites");
    if (storedFavoritesString) {
      try {
        const storedFavoritesArray = JSON.parse(storedFavoritesString);
        setFavorites(storedFavoritesArray);
      } catch (e) {
        console.error("Failed to parse favorites from storage:", e);
        setFavorites([]);
      }
    }
  }, []);
  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blueHeader }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={COLORS.blueHeader}
          />
          <FavoritesContext.Provider value={[favorites, setFavorites]}>
            <Stack screenOptions={{ headerShown: false }}></Stack>
          </FavoritesContext.Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
