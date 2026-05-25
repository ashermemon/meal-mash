import React, { useContext, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import RecipeContext, { type RecipeData } from "@/contexts/RecipeContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import RecipeInfoTags from "@/components/features/recipe/RecipeInfoTags";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import Timer from "@/components/features/recipe/Timer";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styles } from "@/styles/GlobalStyles";
import { NEWCOLORS } from "@/constants/NewTheme";
import { COLORS } from "@/constants/Theme";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import RecipeSection from "@/components/features/recipe/RecipeSection";
import Svg, { Path } from "react-native-svg";

const followRecipe = () => {
  const [contextRecipeData] = useContext(RecipeContext);
  const navigation = useNavigation();

  // Default placeholder data when context is empty
  const defaultRecipeData: RecipeData = {
    responseRecipe: "",
    title: "Recipe Title",
    description:
      "A delicious and easy-to-make meal that is perfect for any occasion. Packed with flavor and nutrients, this recipe is sure to become a family favorite.",
    difficulty: "Medium",
    time: "30 min",
    tags: ["Lunch", "Vegetarian"],
    servings: 2,
    ingredients: [
      "1.5 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 onion, chopped",
    ],
    instructions: [
      { step: "Heat the olive oil in a pan over medium heat." },
      {
        step: "Add the minced garlic and chopped onion, and sauté until fragrant.",
      },
      { step: "Add the rest of the ingredients and cook until done." },
      { step: "Serve hot and enjoy!" },
    ],
    nutrients: [10, 20, 30],
    tips: [
      "Use fresh garlic for better flavor.",
      "You can substitute olive oil with avocado oil.",
      "Add a pinch of salt to enhance the taste.",
    ],
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

  const handleBack = () => {
    if (navigation.canGoBack()) {
      Haptics.selectionAsync();
      navigation.goBack();
    }
  };

  const ingredientParts = useMemo(
    () => (ingredient: string) => {
      const trimmed = ingredient.trim();
      const match = trimmed.match(/(.+?)\s*[-–:]\s*(.+)/);
      if (match && match[1]?.trim() && match[2]?.trim()) {
        return { name: match[1].trim(), amount: match[2].trim() };
      }

      const amountMatch = trimmed.match(/(.*?)(\d+[\d\s\/\.]*\w*)$/);
      if (amountMatch && amountMatch[1]?.trim()) {
        return {
          name: amountMatch[1].trim(),
          amount: amountMatch[2].trim(),
        };
      }

      return { name: trimmed, amount: "" };
    },
    [],
  );

  const totalCalories = useMemo(
    () => nutrients[0] * 4 + nutrients[1] * 9 + nutrients[2] * 4,
    [nutrients],
  );

  const hasTimers = recipeData.instructions.some(
    (instruction) => !!instruction.timerMinutes,
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NEWCOLORS.nestedBG }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Pressable onPress={handleBack}>
            <CustomIcon
              name="arrow-left"
              filled={false}
              color={COLORS.fontColor}
              size={20}
            />
          </Pressable>
          <Pressable onPress={() => {}}>
            <CustomIcon
              name="bookmark"
              filled={false}
              color={COLORS.fontColor}
              size={20}
            />
          </Pressable>
        </View>

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
            <Image
              source={require("@/assets/images/mealExample.png")}
              style={{ width: 70, height: 70, borderRadius: 110 }}
              contentFit="cover"
            />
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.textCenterBold, { fontSize: 23 }]}
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
                color: COLORS.fontColor,
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
            const { name, amount } = ingredientParts(ingredient);
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <BouncyCheckbox
                    size={22}
                    fillColor={COLORS.greenProgressBar}
                    unFillColor={NEWCOLORS.nestedBG}
                    iconStyle={{
                      borderColor: COLORS.addGrey,
                      borderWidth: 2,
                      borderRadius: 10,
                    }}
                    innerIconStyle={{
                      borderWidth: 2,
                      borderColor: COLORS.greenProgressBar,
                    }}
                    isChecked={checked[index]}
                    useBuiltInState={false}
                    style={{ marginRight: 12 }}
                    onPress={() => {
                      const next = [...checked];
                      next[index] = !next[index];
                      setChecked(next);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.textLeftSemiBold,
                      {
                        marginLeft: 0,
                        flex: 1,
                        fontSize: 15,
                        color: COLORS.fontColor,
                      },
                    ]}
                  >
                    {name || ingredient}
                  </Text>
                </View>
                {amount ? (
                  <Text
                    style={[
                      styles.textRight,
                      {
                        fontSize: 15,
                        color: COLORS.searchPlaceholder,
                        marginLeft: 12,
                      },
                    ]}
                  >
                    {amount}
                  </Text>
                ) : null}
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
                    { backgroundColor: NEWCOLORS.stepCircle, flexShrink: 0 },
                  ]}
                >
                  <Text
                    style={[
                      styles.textLeftSemiBold,
                      { color: COLORS.fontColor },
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
                      marginLeft: 12,
                      marginTop: 5,
                      marginBottom: 33,
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
                    color1={NEWCOLORS.blueAccent}
                    color2={NEWCOLORS.greenAccent}
                    color3={NEWCOLORS.orangeAccent}
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
                      fill={NEWCOLORS.tipBadgeBg}
                    />
                  </Svg>

                  <Text
                    style={[
                      styles.textLeftSemiBold,
                      { color: COLORS.fontColor },
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
                      marginLeft: 12,
                      marginBottom: 33,
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default followRecipe;
