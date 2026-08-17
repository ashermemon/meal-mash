import { View, Pressable, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button, Platform, StatusBar, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { storage } from "@/utils/storage";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import MealsLeftContext from "@/contexts/MealsLeftContext";
import AchievementsContext, {
  type AchievementData,
} from "@/contexts/AchievementsContext";
import { PantryDetailsContext, PantryDetails } from "@/contexts/PantryDetails";
import GroceryListContext from "@/contexts/GroceryListContext";
import CheckedGroceryListContext from "@/contexts/CheckedGroceryListContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import {
  GenerationDetailsContext,
  type GenerationDetails,
} from "@/contexts/GenerationDetailsContext";
import { BrowseIngredientsContext } from "@/contexts/BrowseIngredientsContext";
import { Food } from "@/components/features/pantry/Search";
import * as Notifications from "expo-notifications";

import { RecipeProvider, type RecipeData } from "@/contexts/RecipeContext";
import { TrueSheetProvider } from "@/contexts/TrueSheetContext";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import TrueSheetContent from "@/components/common/TrueSheetContent";
import {
  ColorSchemeProvider,
  useTheme,
  useColorScheme,
} from "@/contexts/ColorSchemeContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorSchemeProvider>
        <RootLayoutContent />
      </ColorSchemeProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutContent() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
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
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [pantryDetails, setPantryDetails] = useState<PantryDetails>({
    name: "Your Pantry",
    icon: "",
    ingredients: [],
  });
  const [browseIngredients, setBrowseIngredients] = useState<Food[]>([]);
  const [groceryList, setGroceryList] = useState<Food[]>([]);
  const [checkedGroceryList, setCheckedGroceryList] = useState<Food[]>([]);

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
    storage.set("pantrynumber", pantryDetails.ingredients.length);
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
    const storedSaved = storage.getString("saves");
    if (storedSaved) {
      try {
        const storedSavedArray = JSON.parse(storedSaved);
        const defaultCategories = {
          madeWithLeftovers: false,
          tastyMeals: false,
          sweetTreats: false,
          quickSnacks: false,
          under15Minutes: false,
        };
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
              categories: defaultCategories,
              ingredients: [],
              instructions: [],
              tips: [],
            };
          }
          return { categories: defaultCategories, ...item };
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
      <BrowseIngredientsContext.Provider
        value={[browseIngredients, setBrowseIngredients]}
      >
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
              <PantryDetailsContext.Provider
                value={[pantryDetails, setPantryDetails]}
              >
              <GroceryListContext.Provider
                value={[groceryList, setGroceryList]}
              >
              <CheckedGroceryListContext.Provider
                value={[checkedGroceryList, setCheckedGroceryList]}
              >
                <SavedRecipesContext.Provider
                  value={[savedRecipes, setSavedRecipes]}
                >
                  <MealsLeftContext.Provider
                    value={[mealsLeft, setMealsLeft]}
                  >
                  <AchievementsContext.Provider
                    value={[achievements, setAchievements]}
                  >
                    <RecipeProvider>
                          <StatusBar
                            barStyle={
                              colorScheme === "dark"
                                ? "light-content"
                                : "dark-content"
                            }
                            backgroundColor={theme.newHeader}
                          />

                          <Stack
                            screenOptions={{
                              headerShown: false,
                              contentStyle: {
                                backgroundColor: theme.backgroundColor,
                              },
                            }}
                          />
                          <TrueSheet
                            detents={[0.6, 1]}
                            ref={sheetRef}
                            scrollable
                            header={
                              <>
                                <View
                                  style={{
                                    alignSelf: "center",
                                    width: 44,
                                    height: 4,
                                    borderRadius: 999,
                                    backgroundColor: theme.unselectedShape,
                                    marginTop: 6,
                                    marginBottom: 15,
                                  }}
                                />
                                <Text
                                  style={{
                                    fontSize: 22,
                                    fontFamily: "Nunito-SemiBold",
                                    marginTop: 4,
                                    marginBottom: 15,
                                    color: theme.basicText,
                                  }}
                                >
                                  {currentTitle}
                                </Text>
                                <View
                                  style={{
                                    height: 2.5,
                                    borderRadius: 1000,
                                    backgroundColor: theme.placeholderText,
                                  }}
                                ></View>
                              </>
                            }
                            headerStyle={{
                              paddingHorizontal: 20,
                              paddingTop: 16,
                            }}
                            backgroundColor={theme.sheetBackgroundColor}
                          >
                            <TrueSheetContent
                              currentOnSelect={currentOnSelect}
                              sheetRef={sheetRef}
                              currentOptions={currentOptions}
                            ></TrueSheetContent>
                          </TrueSheet>
                    </RecipeProvider>
                  </AchievementsContext.Provider>
                  </MealsLeftContext.Provider>
                </SavedRecipesContext.Provider>
              </CheckedGroceryListContext.Provider>
              </GroceryListContext.Provider>
              </PantryDetailsContext.Provider>
            </GenerationDetailsContext.Provider>
          </TrueSheetProvider>
        </NotificationProvider>
      </BrowseIngredientsContext.Provider>
  );
}
