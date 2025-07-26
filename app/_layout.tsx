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
import { storage } from "@/utils/storage";
import FavoritesContext from "../contexts/FavoritesContext";
import FavLeftoversContext from "../contexts/FavLeftoversContext";
import SavedRecipesContext from "../contexts/SavedRecipesContext";
import LeftoversContext from "../contexts/LeftoversContext";
import IngredientsContext from "../contexts/IngredientsContext";
import MealsLeftContext from "@/contexts/MealsLeftContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import * as Notifications from "expo-notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesL, setFavoritesL] = useState<string[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [leftovers, setLeftovers] = useState<string[]>([]);
  const [mealsLeft, setMealsLeft] = useState<number>(5);

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [currentDate, setCurrentDate] = useState(getTodayDate());

  //if currentDate != storage date then setMealsLeft to 5 again and set the currentDate to storage date

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
    const totalSaves = storage.getNumber("favsnumber") ?? 0;
    storage.set("favsnumber", favorites.length + favoritesL.length);
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  useEffect(() => {
    const storedFavoritesString = storage.getString("favorites");
    const storedFavoritesStringL = storage.getString("favoritesL");
    const storedSaved = storage.getString("saves");
    if (storedFavoritesString) {
      try {
        const storedFavoritesArray = JSON.parse(storedFavoritesString);
        setFavorites(storedFavoritesArray);
      } catch (e) {
        console.error("Failed to parse favorites from storage:", e);
        setFavorites([]);
      }
    }
    if (storedFavoritesStringL) {
      try {
        const storedFavoritesArray = JSON.parse(storedFavoritesStringL);
        setFavoritesL(storedFavoritesArray);
      } catch (e) {
        console.error("Failed to parse favorites from storage:", e);
        setFavoritesL([]);
      }
    }
    if (storedSaved) {
      try {
        const storedSavedArray = JSON.parse(storedSaved);
        setSavedRecipes(storedSavedArray);
      } catch (e) {
        console.error("Failed to parse favorites from storage:", e);
        setSavedRecipes([]);
      }
    }
  }, []);
  if (!loaded && !error) {
    return null;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: false,
      shouldShowList: false,
    }),
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blueHeader }}>
            <LeftoversContext.Provider value={[leftovers, setLeftovers]}>
              <IngredientsContext.Provider
                value={[ingredients, setIngredients]}
              >
                <FavoritesContext.Provider value={[favorites, setFavorites]}>
                  <FavLeftoversContext.Provider
                    value={[favoritesL, setFavoritesL]}
                  >
                    <SavedRecipesContext.Provider
                      value={[savedRecipes, setSavedRecipes]}
                    >
                      <MealsLeftContext.Provider
                        value={[mealsLeft, setMealsLeft]}
                      >
                        <StatusBar
                          barStyle="dark-content"
                          backgroundColor={COLORS.blueHeader}
                        />
                        <Stack
                          screenOptions={{
                            headerShown: false,
                          }}
                        ></Stack>
                      </MealsLeftContext.Provider>
                    </SavedRecipesContext.Provider>
                  </FavLeftoversContext.Provider>
                </FavoritesContext.Provider>
              </IngredientsContext.Provider>
            </LeftoversContext.Provider>
          </SafeAreaView>
        </SafeAreaProvider>
      </NotificationProvider>
    </GestureHandlerRootView>
  );
}
