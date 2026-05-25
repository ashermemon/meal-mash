import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import React, { useContext, useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { styles } from "@/styles/GlobalStyles";
import { COLORS } from "@/constants/Theme";
import { NEWCOLORS } from "@/constants/NewTheme";
import Prompt from "@/constants/prompt";
import AddIngredients from "@/components/features/generator/AddIngredients";
import AddLeftovers from "@/components/features/generator/AddLeftovers";
import SearchContext from "@/contexts/SearchContext";
import Search from "@/components/features/generator/Search";

import IngredientsContext from "@/contexts/IngredientsContext";
import LeftoversEnabled from "@/contexts/LeftoversOn";
import LeftoversContext from "@/contexts/LeftoversContext";
import { APIKEY } from "@/utils/apikey";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import { storage } from "@/utils/storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import MealsLeftContext from "@/contexts/MealsLeftContext";

import * as Haptics from "expo-haptics";
import RecipeContext from "@/contexts/RecipeContext";
import { router } from "expo-router";

export interface Recipe {
  protein: number;
  fat: number;
  carbs: number;
  difficulty: string;
  duration: string;
  title: string;
  description: string;
  category: string[];
}

export default function Generate() {
  const [isChecked, setChecked] = useState(false);
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);
  const ai = new GoogleGenAI({ apiKey: APIKEY });
  var hsl = require("hsl-to-hex");

  const [responseRecipe, setResponseRecipe] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [leftoversEnabled, setLeftoversEnabled] = useState(false);

  const [recipeData, setRecipeData] = useContext(RecipeContext);

  const [saves, setSaves] = useContext(SavedRecipesContext);

  useEffect(() => {
    const totalSaves = storage.getNumber("mealsnumber") ?? 0;
    storage.set("savesnumber", saves.length);
  });

  const normalizeStringArray = (value: any) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((item) => String(item).trim()).filter(Boolean);
    }
    if (typeof value === "string") {
      return value
        .split(/[,\n]+/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  };

  const parseRecipeJson = (rawText: string) => {
    const trimmed = rawText.trim();
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    const jsonText =
      firstBrace !== -1 && lastBrace > firstBrace
        ? trimmed.slice(firstBrace, lastBrace + 1)
        : trimmed;

    const raw = JSON.parse(jsonText);

    const tags = Array.isArray(raw.tags)
      ? raw.tags.map(String).filter(Boolean)
      : typeof raw.tags === "string"
        ? raw.tags
            .split(/[,\n]+/)
            .map((tag: string) => tag.trim())
            .filter(Boolean)
        : [];

    const nutrients = Array.isArray(raw.nutrients)
      ? [
          Number(raw.nutrients[0]) || 0,
          Number(raw.nutrients[1]) || 0,
          Number(raw.nutrients[2]) || 0,
        ]
      : raw.nutrients && typeof raw.nutrients === "object"
        ? [
            Number(raw.nutrients.protein) || 0,
            Number(raw.nutrients.fat) || 0,
            Number(raw.nutrients.carbs) || 0,
          ]
        : [0, 0, 0];

    const instructions = Array.isArray(raw.instructions)
      ? raw.instructions
          .map((instruction: any) => {
            if (typeof instruction === "string") {
              return { step: instruction.trim(), timerMinutes: undefined };
            }
            return {
              step: String(instruction.step ?? instruction.text ?? "").trim(),
              timerMinutes:
                typeof instruction.timerMinutes === "number"
                  ? instruction.timerMinutes
                  : undefined,
            };
          })
          .filter((item: any) => item.step)
      : [];

    return {
      title: String(raw.title ?? "").trim(),
      description: String(raw.description ?? "").trim(),
      difficulty: String(raw.difficulty ?? "").trim(),
      time: String(raw.time ?? "").trim(),
      servings:
        typeof raw.servings === "number"
          ? raw.servings
          : Number.isFinite(Number(raw.servings))
            ? Number(raw.servings)
            : null,
      nutrients,
      tags,
      ingredients: normalizeStringArray(raw.ingredients),
      instructions,
      tips: normalizeStringArray(raw.tips),
    };
  };

  const fetchResponse = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview", // gemini-3.5-flash
        contents: prompt,
      });

      if (response.text) {
        const geminiText = (response.text || "").replace(/^\s+/, "");
        setResponseRecipe(geminiText);

        const parsedRecipe = parseRecipeJson(geminiText);
        setRecipeData({
          responseRecipe: geminiText,
          title: parsedRecipe.title,
          description: parsedRecipe.description,
          difficulty: parsedRecipe.difficulty,
          time: parsedRecipe.time,
          servings: parsedRecipe.servings,
          nutrients: parsedRecipe.nutrients,
          tags: parsedRecipe.tags,
          ingredients: parsedRecipe.ingredients,
          instructions: parsedRecipe.instructions,
          tips: parsedRecipe.tips,
        });

        router.push("/recipe");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      const totalMeals = storage.getNumber("mealsnumber") ?? 0;
      setMealsLeft(mealsLeft - 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      storage.set("mealsnumber", totalMeals + 1);
    }
  };

  const handleGenerateRecipe = (inputRecipe: string) => {
    setResponseRecipe("");
    fetchResponse(inputRecipe);
  };

  const recipePrompt = Prompt({
    ingredients: ingredients,
    leftovers: leftovers,
    isChecked: isChecked,
  });

  return (
    <>
      <LeftoversEnabled.Provider
        value={[leftoversEnabled, setLeftoversEnabled]}
      >
        <SearchContext.Provider value={[searchActive, setSearchActive]}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
            alwaysBounceVertical={false}
            style={styles.generatorContainer}
          >
            <View style={[styles.container]}>
              <View
                style={{
                  width: "100%",

                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 25,
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Modal
                      isVisible={searchActive}
                      useNativeDriver={true}
                      animationIn="slideInUp"
                      animationOut="slideOutDown"
                      backdropOpacity={0.2}
                      onBackdropPress={() => setSearchActive(false)}
                      onBackButtonPress={() => setSearchActive(false)}
                      animationInTiming={600}
                      animationOutTiming={600}
                      backdropTransitionOutTiming={1}
                      backdropTransitionInTiming={600}
                      style={{
                        margin: 0,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Search />
                      </View>
                    </Modal>
                  </View>

                  {loading ? (
                    <Text style={[styles.textCentered, { marginBottom: 25 }]}>
                      Loading...
                    </Text>
                  ) : (
                    <Text style={[styles.textCentered, { marginBottom: 25 }]}>
                      Generate a meal by adding your leftovers and ingredients
                      below!
                    </Text>
                  )}
                  <View>
                    {loading && (
                      <ActivityIndicator
                        color={COLORS.blueLink}
                        size={"large"}
                      ></ActivityIndicator>
                    )}
                    {error && (
                      <Text style={styles.errorText}>
                        {error.message || error.toString()}
                      </Text>
                    )}
                  </View>
                </View>
                {!loading && (
                  <>
                    <AddLeftovers></AddLeftovers>
                    <AddIngredients></AddIngredients>
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <BouncyCheckbox
                        style={{
                          marginBottom: 15,
                          alignSelf: "center",
                        }}
                        size={25}
                        fillColor={COLORS.greenProgressBar}
                        unFillColor={COLORS.greenButtonColor}
                        text="Allow Additional Ingredients"
                        iconStyle={{
                          borderColor: COLORS.fontColor,
                        }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={[
                          styles.textLeftSemiBold,
                          { textDecorationLine: "none" },
                        ]}
                        textContainerStyle={{
                          flex: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        useBuiltInState={false}
                        isChecked={isChecked}
                        onPress={() => [
                          setChecked(!isChecked),
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
                        ]}
                      />
                    </View>
                  </>
                )}
              </View>

              {!loading && (
                <Pressable
                  style={[
                    styles.generateButton,
                    {
                      backgroundColor:
                        leftovers.length > 0 || ingredients.length > 0
                          ? COLORS.blueHeader
                          : COLORS.searchGreyBG,
                      borderColor:
                        leftovers.length > 0 || ingredients.length > 0
                          ? COLORS.blueHeaderBorder
                          : COLORS.searchGreyBorder,
                    },
                  ]}
                  onPress={
                    leftovers.length > 0 || ingredients.length > 0
                      ? mealsLeft > 0
                        ? () => [
                            handleGenerateRecipe(recipePrompt),
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Light,
                            ),
                          ]
                        : () =>
                            alert(
                              "You have run out of meal generations today. Come again tomorrow!",
                            )
                      : () =>
                          alert(
                            "Add a leftover or ingredient to generate meal!",
                          )
                  }
                >
                  <Text
                    style={[
                      styles.textCentered,
                      { fontFamily: "Nunito-SemiBold" },
                    ]}
                    adjustsFontSizeToFit={true}
                  >
                    Create Meal
                  </Text>
                </Pressable>
              )}

              <View style={styles.spacer}></View>
            </View>
          </ScrollView>
        </SearchContext.Provider>
      </LeftoversEnabled.Provider>
    </>
  );
}
