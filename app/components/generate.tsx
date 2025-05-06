import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { styles } from "@/styles/auth.styles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { COLORS } from "@/constants/theme";
import Prompt from "@/constants/prompt";

type GenerateProps = {
  ingredients: string[];
  leftovers: string[];
};

export default function Generate(props: GenerateProps) {
  const APIKEY = "AIzaSyBoRw8YbfpfxM32Kiq6zNep3XNnBMziqQI";
  const ai = new GoogleGenAI({ apiKey: APIKEY });

  const [responseRecipe, setResponseRecipe] = useState("");

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(0);

  const [error, setError] = useState(null);

  let recipePrompt = "";
  let stepNum = 0;

  var hsl = require("hsl-to-hex");

  const fetchResponse = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response.text) {
        const geminiText = response.text;

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
        return currentStep == stepNum
          ? parseMarkdownTextInline(content)
          : undefined;
      } else {
        return undefined;
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
            style={[styles.textCentered, { fontWeight: "bold" }]}
          >
            {content}
          </Text>
        );
      } else if (text.startsWith("{") && text.endsWith("}")) {
        const content = text.slice(1, -1);
        let timeSec = parseInt(content) * 60;

        return timeSec > 0 ? (
          <View key={index} style={styles.timer}>
            <CountdownCircleTimer
              isPlaying={false}
              duration={timeSec}
              key={index}
              colors={[
                hsl(Math.random() * 360, 45, 79),
                hsl(Math.random() * 360, 45, 79),
                hsl(Math.random() * 360, 45, 79),
                hsl(0, 45, 79),
              ]}
              colorsTime={[timeSec, (timeSec / 3) * 2, timeSec / 3, 0]}
            >
              {({ remainingTime }) => (
                <Text style={styles.textCentered}>
                  {`${Math.floor(remainingTime / 60)}:${String(
                    remainingTime % 60
                  ).padStart(2, "0")}`}
                </Text>
              )}
            </CountdownCircleTimer>
          </View>
        ) : undefined;
      } else {
        return (
          <Text key={index} style={styles.textCentered}>
            {text}
          </Text>
        );
      }
    });
  };

  const saveRecipe = (input: string) => {
    console.log("saved");
  };

  return (
    <>
      <View>
        {loading && <ActivityIndicator></ActivityIndicator>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!loading && (
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            {parseMarkdownText(responseRecipe)}
          </View>
        )}
      </View>

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
    </>
  );
}
