import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
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

type GenerateProps = {
  ingredients: string[];
  leftovers: string[];
};

export default function Generate(props: GenerateProps) {
  const [searchActive, setSearchActive] = useState(false);
  const APIKEY = "AIzaSyBoRw8YbfpfxM32Kiq6zNep3XNnBMziqQI";
  const ai = new GoogleGenAI({ apiKey: APIKEY });
  var hsl = require("hsl-to-hex");
  const [responseRecipe, setResponseRecipe] = useState("");

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(0);

  const [error, setError] = useState(null);

  let recipePrompt = "";
  let stepNum = 0;

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
    ingredients: props.ingredients,
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

  return (
    <>
      <SearchContext.Provider value={setSearchActive}>
        {searchActive ? <Search /> : <></>}
        {!generated && (
          <Text style={styles.textCentered}>
            {loading
              ? "Loading..."
              : "Generate a meal by adding your leftovers and ingredients below!"}
          </Text>
        )}
        <View>
          {loading && <ActivityIndicator></ActivityIndicator>}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {!loading && (
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              {parseMarkdownText(responseRecipe)}
            </View>
          )}
        </View>

        <AddLeftovers></AddLeftovers>
        <AddIngredients></AddIngredients>

        <View style={styles.generateButtonContainer}>
          {!loading && !generated && (
            <Pressable
              style={styles.generateButton}
              onPress={() => handleGenerateRecipe(recipePrompt)}
            >
              <Text style={styles.textCentered}>Create Meal</Text>
            </Pressable>
          )}

          {!loading && generated && currentStep < totalSteps && (
            <Pressable
              style={styles.generateButton}
              onPress={() => setCurrentStep(currentStep + 1)}
            >
              <Text style={styles.textCentered}>Next</Text>
            </Pressable>
          )}

          {!loading && generated && currentStep > 1 && (
            <Pressable
              style={styles.generateButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text style={styles.textCentered}>Previous</Text>
            </Pressable>
          )}

          {!loading && generated && (
            <Pressable
              style={styles.generateButton}
              onPress={() => handleGenerateRecipe(recipePrompt)}
            >
              <Text style={styles.textCentered}>Regenerate Meal</Text>
            </Pressable>
          )}

          {!loading && generated && (
            <Pressable
              style={styles.generateButton}
              onPress={() => saveRecipe(responseRecipe)}
            >
              <Text style={styles.textCentered}>Save Meal to Recipes</Text>
            </Pressable>
          )}
        </View>
      </SearchContext.Provider>
    </>
  );
}
