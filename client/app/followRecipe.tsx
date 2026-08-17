import React, { useContext, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import RecipeContext, { type RecipeData } from "@/contexts/RecipeContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import RecipeInfoTags from "@/components/features/recipe/RecipeInfoTags";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import Timer from "@/components/features/recipe/Timer";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import { useStyles } from "@/styles/GlobalStyles";
import { useIsDarkMode, useTheme } from "@/contexts/ColorSchemeContext";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import RecipeSection from "@/components/features/recipe/RecipeSection";
import Svg, { Path } from "react-native-svg";
import FollowRecipeHeader from "@/components/features/recipe/FollowRecipeHeader";
import { router } from "expo-router";

export const MEAL_IMAGES: Record<string, any> = {
  burger: require("@/assets/images/meal-images/burger.webp"),
  pizza: require("@/assets/images/meal-images/pizza.webp"),
  pasta: require("@/assets/images/meal-images/pasta.webp"),
  salad: require("@/assets/images/meal-images/salad.webp"),
  curry: require("@/assets/images/meal-images/curry.webp"),
  "fried-rice": require("@/assets/images/meal-images/fried-rice.webp"),
  sandwich: require("@/assets/images/meal-images/sandwich.webp"),
  taco: require("@/assets/images/meal-images/taco.webp"),
  soup: require("@/assets/images/meal-images/soup.webp"),
  dessert: require("@/assets/images/meal-images/dessert.webp"),
  breakfast: require("@/assets/images/meal-images/breakfast.webp"),
  seafood: require("@/assets/images/meal-images/seafood.webp"),
  steak: require("@/assets/images/meal-images/steak.webp"),
  bowl: require("@/assets/images/meal-images/bowl.webp"),
};

const followRecipe = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const [contextRecipeData] = useContext(RecipeContext);
  const navigation = useNavigation();
  const bulletMargin = 45; //33

  // default placeholder
  const defaultRecipeData: RecipeData = {
    responseRecipe: "",
    title: "Recipe Title",
    description:
      "A delicious and easy-to-make meal that is perfect for any occasion. Packed with flavor and nutrients, this recipe is sure to become a family favorite.",
    difficulty: "Moderate",
    time: "30 min",
    tags: ["Lunch", "Vegetarian"],
    servings: 2,
    categories: {
      madeWithLeftovers: false,
      tastyMeals: true,
      sweetTreats: false,
      quickSnacks: false,
      under15Minutes: false,
    },
    ingredients: [
      ["1.5 tbsp", "olive oil"],
      ["2 cloves", "garlic, minced"],
      ["1", "onion, chopped"],
    ],
    instructions: [
      {
        step: "Heat the olive oil in a pan over medium heat.",
        timerMinutes: 0,
        timerTask: "",
      },
      {
        step: "Add the minced garlic and chopped onion, and sauté until fragrant.",
        timerMinutes: 0,
        timerTask: "",
      },
      {
        step: "Add the rest of the ingredients and cook until done.",
        timerMinutes: 0,
        timerTask: "",
      },
      {
        step: "Serve hot and enjoy!",
        timerMinutes: 0,
        timerTask: "",
      },
    ],
    nutrients: [10, 20, 30],
    tips: [
      "Use fresh garlic for better flavor.",
      "You can substitute olive oil with avocado oil.",
      "Add a pinch of salt to enhance the taste.",
    ],
    imageCategory: "bowl",
  };

  const recipeData = contextRecipeData?.title
    ? contextRecipeData
    : defaultRecipeData;

  const [checked, setChecked] = useState<boolean[]>(
    (recipeData?.ingredients || []).map(() => false),
  );
  const [nutrients, setNutrients] = useState<number[]>(
    recipeData?.nutrients || [0, 0, 0],
  );

  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.nestedBG }}>
      <FollowRecipeHeader
        pageTitle={recipeData.title || "Generated Meal"}
        progress={scrollProgress}
      />
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        onScroll={(event) => {
          const { layoutMeasurement, contentOffset, contentSize } =
            event.nativeEvent;
          const totalHeight = contentSize.height - layoutMeasurement.height;
          const currentProgress =
            totalHeight > 0 ? contentOffset.y / totalHeight : 0;
          setScrollProgress(Math.min(Math.max(currentProgress, 0), 1));
        }}
        scrollEventThrottle={16}
      >
        <View
          style={[
            {
              paddingHorizontal: 20,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              marginBottom: 20,
            }}
          >
            <View
              style={[
                styles.imageGlow,
                { width: 70, height: 70, borderRadius: 110 },
              ]}
            >
              <Image
                source={
                  MEAL_IMAGES[recipeData.imageCategory] || MEAL_IMAGES.bowl
                }
                style={{ width: "100%", height: "100%", borderRadius: 110 }}
                contentFit="cover"
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 18 }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.textLeftBold, { fontSize: 23 }]}
              >
                {recipeData.title}
              </Text>
              <RecipeInfoTags
                difficulty={recipeData.difficulty}
                time={recipeData.time}
                tags={recipeData.tags}
                marginTop={8}
              />
            </View>
          </View>
          <Text
            style={[
              styles.textCentered,
              {
                fontSize: 16,
                lineHeight: 24,
                color: theme.fontColor,
                marginBottom: 10,
              },
            ]}
          >
            {recipeData.description}
          </Text>
        </View>

        <View
          style={[
            {
              marginBottom: 10,
              paddingHorizontal: 10,
              paddingTop: 10,
              paddingBottom: 15,
            },
          ]}
        >
          <NutrientsContext.Provider value={[nutrients, setNutrients]}>
            <NutrientCircle textInBox={true} />
          </NutrientsContext.Provider>
        </View>

        <RecipeSection
          sectionTitle="Ingredients"
          servings={recipeData?.servings !== null ? recipeData?.servings : null}
        >
          {(recipeData?.ingredients || []).map((ingredient, index) => {
            const amount = ingredient[0];
            const name = ingredient[1];
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 33,
                }}
              >
                <View style={{ marginRight: 12 }}>
                  <CustomCheckbox
                    checked={checked[index]}
                    onChange={() => {
                      const next = [...checked];
                      next[index] = !next[index];
                      setChecked(next);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                    }}
                    size={24}
                  />
                </View>
                <Pressable
                  style={{ flex: 1, flexDirection: "row" }}
                  onPress={() => {
                    const next = [...checked];
                    next[index] = !next[index];
                    setChecked(next);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.textLeftSemiBold,
                        {
                          marginLeft: 0,
                          flex: 1,
                          fontSize: 15,
                          color: theme.fontColor,
                        },
                      ]}
                    >
                      {name}
                    </Text>
                  </View>
                  {amount ? (
                    <Text
                      style={[
                        styles.textRight,
                        {
                          fontSize: 15,
                          color: theme.searchPlaceholder,
                          marginLeft: 12,
                        },
                      ]}
                    >
                      {amount}
                    </Text>
                  ) : null}
                </Pressable>
              </View>
            );
          })}
        </RecipeSection>

        <RecipeSection sectionTitle="Instructions">
          {(recipeData?.instructions || []).map((instruction, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={[
                    styles.stepCircle,
                    { backgroundColor: theme.greenBlock, flexShrink: 0 },
                  ]}
                >
                  <Text
                    style={[
                      styles.textLeftSemiBold,
                      { color: theme.fontColor },
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.textLeft,
                    {
                      flex: 1,
                      fontSize: 15,
                      lineHeight: 22,
                      marginLeft: 16,
                      marginTop: 5,
                      marginBottom: bulletMargin,
                    },
                  ]}
                >
                  {instruction.step}
                </Text>
              </View>
              {instruction.timerMinutes ? (
                <View style={{ marginTop: -20, marginBottom: 5 }}>
                  <Timer
                    time={instruction.timerMinutes * 60}
                    taskDescription={instruction.timerTask}
                  />
                </View>
              ) : null}
            </View>
          ))}
        </RecipeSection>

        {(recipeData?.tips || []).length > 0 ? (
          <RecipeSection sectionTitle="Helpful Tips">
            {(recipeData?.tips || []).map((tip: any, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <View style={[styles.tipBadgeContainer]}>
                  <Svg
                    width="33"
                    height="37"
                    viewBox="0 0 33 37"
                    style={styles.svgBackground}
                  >
                    <Path
                      d="M11.8307 3.50018C13.1625 -1.16672 19.7764 -1.16672 21.1083 3.50018C21.8228 6.00364 24.3948 7.48858 26.92 6.85558C31.6276 5.67557 34.9346 11.4034 31.5589 14.8903C29.748 16.7607 29.748 19.7306 31.5589 21.6011C34.9346 25.088 31.6276 30.8158 26.92 29.6357C24.3948 29.0028 21.8228 30.4877 21.1083 32.9912C19.7764 37.6581 13.1625 37.6581 11.8307 32.9912C11.1162 30.4877 8.54421 29.0028 6.01892 29.6357C1.31134 30.8158 -1.99562 25.088 1.3801 21.6011C3.19094 19.7306 3.19094 16.7607 1.3801 14.8903C-1.99561 11.4034 1.31134 5.67557 6.01892 6.85559C8.54421 7.48858 11.1162 6.00364 11.8307 3.50018Z"
                      fill={theme.yellowBlock}
                    />
                  </Svg>

                  <Text
                    style={[
                      styles.textLeftSemiBold,
                      { color: theme.fontColor },
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.textLeft,
                    {
                      flex: 1,
                      fontSize: 15,
                      lineHeight: 22,
                      marginLeft: 16,
                      marginBottom: bulletMargin,
                      marginTop: 5,
                    },
                  ]}
                >
                  {tip}
                </Text>
              </View>
            ))}
          </RecipeSection>
        ) : null}
        <RecipeSection titleOff>
          <Pressable
            style={[
              styles.basicBoxShadow,
              {
                backgroundColor: theme.primary,
                paddingVertical: 14,
                borderRadius: 15,
                width: "100%",
              },
            ]}
            onPress={() =>
              navigation.canGoBack()
                ? [navigation.goBack(), Haptics.selectionAsync()]
                : router.navigate("/recipe")
            }
          >
            <Text
              style={[
                styles.textCenterBold,
                { color: theme.pureWhite, fontSize: 18 },
              ]}
            >
              ← Return to Swiping
            </Text>
          </Pressable>
        </RecipeSection>
      </ScrollView>
    </SafeAreaView>
  );
};

export default followRecipe;
