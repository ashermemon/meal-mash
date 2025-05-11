import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { styles } from "@/styles/auth.styles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { COLORS } from "@/constants/theme";
import Prompt from "@/constants/prompt";
import Timer from "./timer";
import NewCard from "./newcard";
import AddIngredients from "./addingredients";
import AddLeftovers from "./addleftovers";
import SearchContext from "../contexts/SearchContext";
import Search from "./search";
import BackArrow from "../Icons/BackArrow";
import ForwardArrow from "../Icons/ForwardArrow";
import { Dimensions } from "react-native";
import IngredientsContext from "../contexts/IngredientsContext";

type GenerateProps = {
  leftovers: string[];
};

export default function Generate(props: GenerateProps) {
  const [searchActive, setSearchActive] = useState(false);
  const APIKEY = "";
  const ai = new GoogleGenAI({ apiKey: APIKEY });
  var hsl = require("hsl-to-hex");
  const [responseRecipe, setResponseRecipe] = useState("");

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(0);

  const [error, setError] = useState(null);

  const [ingredients, setIngredients] = useState<string[]>([]);

  let recipePrompt = "";
  let stepNum = 0;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const NewIngredientCard = (ingredient: string) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  const fetchResponse = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response.text) {
        const geminiText = response.text.replace(/^\s+/, "");

        const stepMatches = geminiText.match(/«[^»]+»/g);
        setTotalSteps(stepMatches ? stepMatches.length : 0);

        setResponseRecipe(geminiText);
        console.log(geminiText);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      setGenerated(true);
    }
  };

  const handleGenerateRecipe = (inputRecipe: string) => {
    setCurrentStep(1);

    setTotalSteps(0);
    stepNum = 0;
    fetchResponse(inputRecipe);
  };

  recipePrompt = Prompt({
    ingredients: ingredients,
    leftovers: props.leftovers,
  });

  const parseMarkdownText = (input: string) => {
    const texts = input.split(/(\«[^»]+\»)/g);

    return texts.map((text, index) => {
      if (text.startsWith("«") && text.endsWith("»")) {
        const content = text.slice(1, -1);
        stepNum += 1;
        parseMarkdownTextInline(content);
        return currentStep == stepNum ? parseMarkdownTextInline(content) : null;
      } else {
        return null;
      }
    });
  };

  const parseMarkdownTextInline = (input: string) => {
    const texts = input.split(/(\*\*[^*]+\*\*|\{[^}]+\})/g);
    return texts.map((text, index) => {
      if (text.startsWith("**") && text.endsWith("**")) {
        const content = text.slice(2, -2);

        return (
          <Text
            key={index}
            style={[styles.textCentered, { fontFamily: "Nunito-Bold" }]}
          >
            {content}
          </Text>
        );
      } else if (text.startsWith("{") && text.endsWith("}")) {
        const content = text.slice(1, -1);
        let timeSec = parseInt(content) * 60;
        let color1 = hsl(Math.random() * 360, 45, 79);
        let color2 = hsl(Math.random() * 360, 45, 79);
        let color3 = hsl(Math.random() * 360, 45, 79);

        return timeSec > 0 ? (
          <Timer
            key={index}
            time={timeSec}
            color1={color1}
            color2={color2}
            color3={color3}
          ></Timer>
        ) : null;
      } else if (text.replace(/\n/g, "").trim() !== "") {
        return (
          <Text key={index} style={styles.textCentered}>
            {text}
          </Text>
        );
      } else {
        return null;
      }
    });
  };

  const saveRecipe = (input: string) => {
    console.log(`saved ${responseRecipe}`);
  };

  const newMeal = () => {
    setGenerated(false);
    setIngredients([]);
  };

  return (
    <>
      <IngredientsContext.Provider value={[ingredients, setIngredients]}>
        <SearchContext.Provider value={setSearchActive}>
          <View style={{ minHeight: screenHeight * 0.5, width: "100%" }}>
            <View style={{ paddingHorizontal: 20 }}>
              <Modal
                style={[
                  styles.modalWrap,
                  {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
                animationType="slide"
                transparent={true}
                visible={searchActive}
                onRequestClose={() => {
                  setSearchActive(!searchActive);
                }}
              >
                <Search
                  ingredients={ingredients}
                  onAddIngredient={setIngredients}
                />
              </Modal>
              {loading ? (
                <Text style={[styles.textCentered, { marginBottom: 25 }]}>
                  Loading...
                </Text>
              ) : !generated ? (
                <Text style={[styles.textCentered, { marginBottom: 25 }]}>
                  Generate a meal by adding your leftovers and ingredients
                  below!
                </Text>
              ) : (
                <></>
              )}
              <View>
                {loading && <ActivityIndicator></ActivityIndicator>}
                {error && <Text style={styles.errorText}>{error}</Text>}
                {!loading && generated && (
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    {parseMarkdownText(responseRecipe)}
                  </View>
                )}
              </View>
            </View>
            {!loading && !generated && (
              <>
                <AddLeftovers></AddLeftovers>
                <AddIngredients
                  ingredients={ingredients}
                  onAddIngredient={NewIngredientCard}
                ></AddIngredients>
              </>
            )}
          </View>

          <View
            style={[styles.arrowButtons, { minHeight: screenHeight * 0.1 }]}
          >
            <View style={styles.flexBTN}>
              {!loading && generated && currentStep > 1 ? (
                <Pressable
                  style={styles.nextButton}
                  onPress={() => setCurrentStep(currentStep - 1)}
                >
                  <BackArrow
                    iconsetcolor={COLORS.fontColor}
                    setheight={20}
                    setwidth={40}
                  ></BackArrow>
                </Pressable>
              ) : (
                <View style={{ width: 40 }} />
              )}
            </View>
            <View style={styles.flexMiddle}>
              <View style={styles.generateButtonContainer}>
                {!loading && !generated && (
                  <Pressable
                    style={styles.generateButton}
                    onPress={() => handleGenerateRecipe(recipePrompt)}
                  >
                    <Text
                      style={styles.textCentered}
                      adjustsFontSizeToFit={true}
                    >
                      Create Meal
                    </Text>
                  </Pressable>
                )}

                {!loading && generated && (
                  <>
                    <Pressable
                      style={styles.generateButton}
                      onPress={() => handleGenerateRecipe(recipePrompt)}
                    >
                      <View>
                        <Text
                          style={styles.textCentered}
                          adjustsFontSizeToFit={true}
                        >
                          Regenerate
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable
                      style={styles.generateButton}
                      onPress={() => saveRecipe(responseRecipe)}
                    >
                      <View>
                        <Text
                          style={styles.textCentered}
                          adjustsFontSizeToFit={true}
                        >
                          Save Meal
                        </Text>
                      </View>
                    </Pressable>
                    <Pressable
                      style={styles.generateButton}
                      onPress={() => newMeal()}
                    >
                      <View>
                        <Text
                          style={styles.textCentered}
                          adjustsFontSizeToFit={true}
                        >
                          Discard Meal
                        </Text>
                      </View>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
            <View style={styles.flexBTN}>
              {!loading && generated && currentStep < totalSteps ? (
                <Pressable
                  style={styles.nextButton}
                  onPress={() => setCurrentStep(currentStep + 1)}
                >
                  <ForwardArrow
                    iconsetcolor={COLORS.fontColor}
                    setheight={20}
                    setwidth={40}
                  ></ForwardArrow>
                </Pressable>
              ) : (
                <View style={{ width: 40 }} />
              )}
            </View>
          </View>
          <View style={styles.spacer}></View>
        </SearchContext.Provider>
      </IngredientsContext.Provider>
    </>
  );
}
