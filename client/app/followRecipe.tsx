import React, { useContext, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import RecipeContext from "@/contexts/RecipeContext";
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

const followRecipe = () => {
  const [contextRecipeData] = useContext(RecipeContext);
  const navigation = useNavigation();

  // Default placeholder data when context is empty
  const defaultRecipeData = {
    title: "Recipe Title Title",
    description: "Recipe description will appear here...",
    difficulty: "Medium",
    time: "30 min",
    tags: [],
    servings: null,
    ingredients: [],
    instructions: [],
    nutrients: [0, 0, 0],
    tips: [],
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
                style={[styles.textCenterBold, { fontSize: 20 }]}
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
            styles.card,
            {
              marginBottom: 10,
              paddingHorizontal: 10,
              paddingTop: 10,
              paddingBottom: 25,
            },
          ]}
        >
          <NutrientsContext.Provider value={[nutrients, setNutrients]}>
            <NutrientCircle textInBox={true} />
          </NutrientsContext.Provider>
        </View>

        <View style={[styles.card, { marginBottom: 20, padding: 10 }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={[
                styles.textLeftSemiBold,
                { fontSize: 18, marginBottom: 5 },
              ]}
            >
              Ingredients
            </Text>
            {recipeData?.servings !== null ? (
              <Text
                style={[
                  styles.textRight,
                  { color: COLORS.searchPlaceholder, fontSize: 13 },
                ]}
              >
                Makes {recipeData?.servings} servings
              </Text>
            ) : null}
          </View>
          {(recipeData?.ingredients || []).map((ingredient, index) => {
            const { name, amount } = ingredientParts(ingredient);
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
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
        </View>

        <View
          style={[
            styles.card,
            { marginBottom: 20, paddingHorizontal: 10, paddingBottom: 15 },
          ]}
        >
          <Text
            style={[
              styles.textLeftSemiBold,
              { fontSize: 18, marginBottom: 21 },
            ]}
          >
            Instructions
          </Text>
          {(recipeData?.instructions || []).map((instruction, index) => (
            <View key={index} style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View
                  style={[
                    styles.stepCircle,
                    { backgroundColor: NEWCOLORS.greenBlock },
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
                    { flex: 1, fontSize: 15, lineHeight: 22, marginLeft: 14 },
                  ]}
                >
                  {instruction.step}
                </Text>
              </View>
              {instruction.timerMinutes ? (
                <View style={{ marginTop: 18 }}>
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
        </View>

        {(recipeData?.tips || []).length > 0 ? (
          <View
            style={[
              styles.card,
              { marginBottom: 20, paddingHorizontal: 10, paddingBottom: 10 },
            ]}
          >
            <Text
              style={[
                styles.textLeftSemiBold,
                { fontSize: 18, marginBottom: 21 },
              ]}
            >
              Helpful Tips
            </Text>
            {(recipeData?.tips || []).map((tip: any, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 14,
                }}
              >
                <View style={styles.tipBadge}>
                  <Text
                    style={[
                      styles.textLeftSemiBold,
                      { color: NEWCOLORS.darkButton },
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.textLeft,
                    { flex: 1, fontSize: 15, lineHeight: 22, marginLeft: 12 },
                  ]}
                >
                  {tip}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default followRecipe;
