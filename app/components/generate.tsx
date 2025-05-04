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

  const [error, setError] = useState(null);

  let recipePrompt = "";

  const fetchResponse = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response.text) {
        const geminiText = response.text;

        setResponseRecipe(geminiText);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      setGenerated(true);
    }
  };

  const handleGenerateRecipe = (inputRecipe: string) => {
    fetchResponse(inputRecipe);
  };

  recipePrompt = `
  Generate a delicious meal and realistic that must use these leftovers:
  ${props.leftovers}
  The user also has these following ingredients available (optional):
  ${props.ingredients}


  You don't have to use all the ingredients, but you must use all of the leftovers!
  Assume the user has access to basic ingredients like salt and oil, as well as pans, pots and other basic kitchen tools.
  Make the recipe genuinely serious and really tasty. Don't just put the ingredients together. If the user added an ingredient that wouldn't go well, just omit it!




  With your response, Follow this structure exactly, without any exceptions at all. Text in square brackets ([]) is for you to replace appropriately to form the recipe. 
  If you need to use a TIMER IN A STEP, use THIS FORMAT: {minutes}. Don't approximate. Be exact and put just the number inside the curly brackets. For example, "Put the rice in the boiling water for {5}". You can bold the recipe name and each step using "**" before and after the desired bold text.


  HERE IS THE STRUCTURE:


  [Recipe Name]:
  [total recipe time]


  Nutrients:
  Calories: [calories]
  Protein: [protein]
  Fat: [fat]
  Carbs: [fiber]



  Ingredients:


  [Quantity of leftovers] [leftover name]
  [etc..]


  [Quantity of ingredient] [ingredient name]
  [etc…]


  Instructions:


  [step 1]
  [step 2]
  [etc..]


  Enjoy your [Recipe Name]
  `;

  const parseMarkdownText = (input: string) => {
    const texts = input.split(/(\*\*[^*]+\*\*|\{[^}]+\})/g);

    return texts.map((text, index) => {
      if (text.startsWith("**") && text.endsWith("**")) {
        const content = text.slice(2, -2);
        return (
          <Text key={index} style={{ fontWeight: "bold" }}>
            {content}
          </Text>
        );
      } else if (text.startsWith("{") && text.endsWith("}")) {
        const content = text.slice(1, -1);
        return (
          <Text key={index} style={{ fontStyle: "italic" }}>
            {content}
          </Text>
        );
      } else {
        return <Text key={index}>{text}</Text>;
      }
    });
  };

  return (
    <View>
      {!loading && !generated && (
        <Pressable
          style={styles.generateButton}
          onPress={() => handleGenerateRecipe(recipePrompt)}
        >
          <Text>Create Meal</Text>
        </Pressable>
      )}

      {loading && <ActivityIndicator></ActivityIndicator>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && <Text>{parseMarkdownText(responseRecipe)}</Text>}

      {!loading && generated && (
        <Pressable
          style={styles.generateButton}
          onPress={() => handleGenerateRecipe(recipePrompt)}
        >
          <Text>Regenerate Meal</Text>
        </Pressable>
      )}
    </View>
  );
}
