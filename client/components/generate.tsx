import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { GoogleGenAI } from "@google/genai";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { NEWCOLORS } from "@/constants/newtheme";
import Prompt from "@/constants/prompt";
import Timer from "./timer";
import AddIngredients from "@/components/addingredients";
import AddLeftovers from "@/components/addleftovers";
import SearchContext from "@/contexts/SearchContext";
import Search from "@/components/search";

import { Dimensions } from "react-native";
import IngredientsContext from "@/contexts/IngredientsContext";
import LeftoversEnabled from "@/contexts/LeftoversOn";
import LeftoversContext from "@/contexts/LeftoversContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import NutrientCircle from "./nutrientcircle";

import { APIKEY } from "@/utils/apikey";
import SavedRecipesContext from "../contexts/SavedRecipesContext";
import { storage } from "@/utils/storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ProgressBar from "@/components/progressbar";
import { ScrollView } from "react-native-gesture-handler";
import MealsLeftContext from "@/contexts/MealsLeftContext";

import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { CustomIcon } from "@/icon-loader/icon-loader";
import GenerationCardPreview from "./generationcardpreview";
import RecipeContext from "@/contexts/RecipeContext";
import { router } from "expo-router";

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

  const fetchResponse = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      if (response.text) {
        const geminiText = (response.text || "").replace(/^\s+/, "");
        setResponseRecipe(geminiText);
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

  useEffect(() => {
    if (!responseRecipe) return;

    const modifiedTexts = responseRecipe.split(
      /(<(?:protein|fat|carbs|difficulty|duration|title|desc)>[\s\S]*?<\/(?:protein|fat|carbs|difficulty|duration|title|desc)>)/g,
    );

    let protein = 0;
    let fat = 0;
    let carbs = 0;
    let diff = "";
    let dur = "";
    let titleContent = "";
    let descContent = "";

    modifiedTexts.forEach((text) => {
      if (text.startsWith("<protein>") && text.endsWith("</protein>")) {
        protein = Number(text.slice(9, -10));
      } else if (text.startsWith("<fat>") && text.endsWith("</fat>")) {
        fat = Number(text.slice(5, -6));
      } else if (text.startsWith("<carbs>") && text.endsWith("</carbs>")) {
        carbs = Number(text.slice(7, -8));
      } else if (
        text.startsWith("<difficulty>") &&
        text.endsWith("</difficulty>")
      ) {
        diff = text.slice(12, -13);
      } else if (
        text.startsWith("<duration>") &&
        text.endsWith("</duration>")
      ) {
        dur = text.slice(10, -11);
      } else if (text.startsWith("<title>") && text.endsWith("</title>")) {
        titleContent = text.slice(7, -8);
      } else if (text.startsWith("<desc>") && text.endsWith("</desc>")) {
        descContent = text.slice(6, -7);
      }
    });

    setRecipeData({
      responseRecipe: responseRecipe,
      title: titleContent,
      description: descContent,
      difficulty: diff,
      time: dur,
      nutrients: [protein, fat, carbs],
      tags: [], // Tags were empty in the original component too
    });

    router.push("/recipe");
  }, [responseRecipe]);

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
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Soft,
                          ),
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
