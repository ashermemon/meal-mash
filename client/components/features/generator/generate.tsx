import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import React, { useContext, useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { styles } from "@/styles/GlobalStyles";
import { COLORS } from "@/constants/Theme";
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
import { RecipeSchema } from "@/utils/RecipeSchema";

export default function Generate() {
  const [isChecked, setChecked] = useState(false);
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);
  const ai = new GoogleGenAI({ apiKey: APIKEY });

  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [leftoversEnabled, setLeftoversEnabled] = useState(false);

  const [recipeData, setRecipeData] = useContext(RecipeContext);

  const [saves, setSaves] = useContext(SavedRecipesContext);

  useEffect(() => {
    storage.set("savesnumber", saves.length);
  }, [saves.length]);

  const fetchResponse = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,

        config: {
          responseMimeType: "application/json",
          responseSchema: RecipeSchema,
        },
      });

      if (response.text) {
        console.log("Raw response text:", response.text);
        const parsedRecipe = JSON.parse(response.text);

        setRecipeData({
          id: `recipe_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          prompt: prompt,
          responseRecipe: response.text,
          title: parsedRecipe.title,
          description: parsedRecipe.description,
          difficulty: parsedRecipe.difficulty,
          time: parsedRecipe.time,
          servings: parsedRecipe.servings,

          nutrients: [
            Number(parsedRecipe.nutrients?.protein) || 0,
            Number(parsedRecipe.nutrients?.fat) || 0,
            Number(parsedRecipe.nutrients?.carbs) || 0,
          ],

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
      setMealsLeft(mealsLeft); //mealsLeft - 1
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      storage.set("savesnumber", saves.length); // Update total save count in storage
      storage.set("mealsnumber", totalMeals + 1);
    }
  };

  const handleGenerateRecipe = (inputRecipe: string) => {
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
