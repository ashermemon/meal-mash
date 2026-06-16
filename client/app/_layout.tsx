import { View, Pressable, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button, Platform, StatusBar, Text } from "react-native";
import { styles } from "@/styles/GlobalStyles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import { COLORS } from "@/constants/Theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { storage } from "@/utils/storage";
import FavoritesContext from "@/contexts/FavoritesContext";
import FavLeftoversContext from "@/contexts/FavLeftoversContext";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import MealsLeftContext from "@/contexts/MealsLeftContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import {
  GenerationDetailsContext,
  type GenerationDetails,
} from "@/contexts/GenerationDetailsContext";
import * as Notifications from "expo-notifications";

import { RecipeProvider, type RecipeData } from "@/contexts/RecipeContext";
import { TrueSheetProvider } from "@/contexts/TrueSheetContext";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import TrueSheetContent from "@/components/common/TrueSheetContent";
import { NEWCOLORS } from "@/constants/NewTheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesL, setFavoritesL] = useState<string[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<RecipeData[]>([]);
  const [generationDetails, setGenerationDetails] = useState<GenerationDetails>(
    {
      ingredients: [],
      leftovers: [],
      generationType: 0,
      difficulties: [],
      recipeTime: [],
      numberOfServings: 1,
      mealType: [],
      cuisine: [],
      dietaryPreference: [],
    },
  );
  const [mealsLeft, setMealsLeft] = useState<number>(500);

  const sheetRef = useRef<TrueSheet>(null);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [currentSelected, setCurrentSelected] = useState<string[]>([]);
  const [currentOnSelect, setCurrentOnSelect] = useState<
    ((options: string[]) => void) | null
  >(null);
  const [currentTitle, setCurrentTitle] = useState<string>("");

  const openSheet = useCallback(
    (
      options: string[],
      onSelect: (options: string[]) => void,
      title: string,
      selected: string[] = [],
    ) => {
      setCurrentOptions(options);
      setCurrentSelected(selected);
      setCurrentOnSelect(() => onSelect);
      setCurrentTitle(title);
      sheetRef.current?.present();
    },
    [],
  );

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [currentDate, setCurrentDate] = useState(getTodayDate());

  const [loaded, error] = useFonts({
    "Nunito-ExtraLight": require("../assets/fonts/Nunito-Weights/Nunito-ExtraLight.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito-Weights/Nunito-Light.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Weights/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Weights/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-Weights/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Weights/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-Weights/Nunito-ExtraBold.ttf"),

    "Nunito-ExtraLightItalic": require("../assets/fonts/Nunito-Weights/Nunito-ExtraLightItalic.ttf"),
    "Nunito-LightItalic": require("../assets/fonts/Nunito-Weights/Nunito-LightItalic.ttf"),
    "Nunito-MediumItalic": require("../assets/fonts/Nunito-Weights/Nunito-MediumItalic.ttf"),
    "Nunito-Italic": require("../assets/fonts/Nunito-Weights/Nunito-Italic.ttf"),
    "Nunito-SemiBoldItalic": require("../assets/fonts/Nunito-Weights/Nunito-SemiBoldItalic.ttf"),
    "Nunito-BoldItalic": require("../assets/fonts/Nunito-Weights/Nunito-BoldItalic.ttf"),
    "Nunito-ExtraBoldItalic": require("../assets/fonts/Nunito-Weights/Nunito-ExtraBoldItalic.ttf"),
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
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: false,
        shouldShowList: false,
      }),
    });
  }, []);

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
        const normalizedSaves = storedSavedArray.map((item: any) => {
          if (typeof item === "string") {
            return {
              responseRecipe: "",
              title: item,
              description: "",
              difficulty: "",
              time: "",
              servings: null,
              nutrients: [0, 0, 0],
              tags: [],
              ingredients: [],
              instructions: [],
              tips: [],
            };
          }
          return item;
        });
        setSavedRecipes(normalizedSaves);
      } catch (e) {
        console.error("Failed to parse favorites from storage:", e);
        setSavedRecipes([]);
      }
    }
  }, []);
  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationProvider>
        <TrueSheetProvider
          sheetRef={sheetRef}
          openSheet={openSheet}
          currentOptions={currentOptions}
          currentSelected={currentSelected}
          currentOnSelect={currentOnSelect}
          currentTitle={currentTitle}
        >
          <GenerationDetailsContext.Provider
            value={[generationDetails, setGenerationDetails]}
          >
            <FavoritesContext.Provider value={[favorites, setFavorites]}>
              <FavLeftoversContext.Provider value={[favoritesL, setFavoritesL]}>
                <SavedRecipesContext.Provider
                  value={[savedRecipes, setSavedRecipes]}
                >
                  <MealsLeftContext.Provider value={[mealsLeft, setMealsLeft]}>
                    <RecipeProvider>
                      <StatusBar
                        barStyle="dark-content"
                        backgroundColor={COLORS.newHeader}
                      />

                      <Stack
                        screenOptions={{
                          headerShown: false,
                          contentStyle: { backgroundColor: "#FCFCFC" },
                        }}
                      ></Stack>

                      <TrueSheet
                        ref={sheetRef}
                        scrollable
                        header={
                          <>
                            <Text
                              style={{
                                fontSize: 22,
                                fontFamily: "Nunito-SemiBold",
                                marginTop: 21,
                                marginBottom: 15,
                                color: "white",
                              }}
                            >
                              {currentTitle}
                            </Text>
                            <View
                              style={{
                                height: 3,
                                backgroundColor: NEWCOLORS.placeholderText,
                              }}
                            ></View>
                          </>
                        }
                        headerStyle={{
                          paddingHorizontal: 20,
                          paddingTop: 16,
                        }}
                        backgroundColor={NEWCOLORS.darkButton}
                      >
                        <TrueSheetContent
                          currentOnSelect={currentOnSelect}
                          sheetRef={sheetRef}
                          currentOptions={currentOptions}
                        ></TrueSheetContent>
                      </TrueSheet>
                    </RecipeProvider>
                  </MealsLeftContext.Provider>
                </SavedRecipesContext.Provider>
              </FavLeftoversContext.Provider>
            </FavoritesContext.Provider>
          </GenerationDetailsContext.Provider>
        </TrueSheetProvider>
      </NotificationProvider>
    </GestureHandlerRootView>
  );
}
