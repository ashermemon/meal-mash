import React, { useState, useContext, useEffect } from "react";
import { View, Dimensions, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
  Easing,
} from "react-native-reanimated";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import GenerationCardPreview from "./GenerationCardPreview";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import { saveRecipe as persistRecipe } from "@/components/features/recipe/SaveRecipe";
import RecipeContext, { type RecipeData } from "@/contexts/RecipeContext";
import MealsLeftContext from "@/contexts/MealsLeftContext";
import { GoogleGenAI } from "@google/genai";
import { APIKEY } from "@/utils/apikey";
import { RecipeSchema } from "@/utils/RecipeSchema";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  title: string | undefined;
  description: string;
  difficulty: string;
  time: string;
  servings: number | null;
  steps: number;
  tags: string[];
};

const PreviewAnimatedWrapper = (props: Props) => {
  const [savedRecipes, setSavedRecipes] = useContext(SavedRecipesContext);
  const [recipeData, setRecipeData] = useContext(RecipeContext);
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);

  const [recipeQueue, setRecipeQueue] = useState<RecipeData[]>([]);
  const [isPreFetching, setIsPreFetching] = useState(false);

  // Keep a ref of mealsLeft so the async prefetch always reads the latest value
  const mealsLeftRef = React.useRef(mealsLeft);
  useEffect(() => {
    mealsLeftRef.current = mealsLeft;
  }, [mealsLeft]);

  const translateX = useSharedValue(0);
  const ROTATION = 10;

  // Initialize the queue with the first generated recipe
  useEffect(() => {
    if (recipeData && recipeData.title && recipeQueue.length === 0) {
      setRecipeQueue([recipeData]);
    }
  }, [recipeData]);

  // Sync RecipeContext with the current top card whenever the queue changes
  // (must NOT happen inside a state updater — useEffect runs after render)
  useEffect(() => {
    if (recipeQueue.length > 0) {
      setRecipeData(recipeQueue[0]);
    }
  }, [recipeQueue[0]?.id]);

  // Background pre-fetch logic using Gemini API
  const prefetchNextRecipe = async () => {
    if (mealsLeftRef.current <= 0) {
      console.warn("Out of meals left. Skipping background generation.");
      return;
    }
    if (isPreFetching) return;
    if (!recipeData.prompt) {
      console.warn("No prompt found to generate background recipes.");
      return;
    }

    setIsPreFetching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: APIKEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: recipeData.prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: RecipeSchema,
        },
      });

      if (response.text) {
        const parsedRecipe = JSON.parse(response.text);
        const newRecipe: RecipeData = {
          id: `recipe_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          prompt: recipeData.prompt,
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
        };

        setRecipeQueue((prevQueue) => {
          if (prevQueue.some((r) => r.id === newRecipe.id || r.title === newRecipe.title)) {
            return prevQueue;
          }
          return [...prevQueue, newRecipe];
        });
      }
    } catch (err) {
      console.error("Failed to prefetch recipe in background:", err);
    } finally {
      setIsPreFetching(false);
    }
  };

  // Pre-fetch triggered when queue length becomes 1
  useEffect(() => {
    if (recipeQueue.length === 1 && !isPreFetching) {
      prefetchNextRecipe();
    }
  }, [recipeQueue.length, isPreFetching]);

  const removeTopCardJS = () => {
    setRecipeQueue((prev) => prev.slice(1));
    setMealsLeft((prev) => Math.max(0, prev - 1));
  };


  const handleSaveRecipeJS = () => {
    if (recipeQueue.length > 0) {
      persistRecipe(recipeQueue[0], setSavedRecipes);
    }
  };

  const saveRecipe = () => {
    "worklet";
    runOnJS(handleSaveRecipeJS)();
    translateX.value = withTiming(
      SCREEN_WIDTH + 100,
      { duration: 400, easing: Easing.inOut(Easing.cubic) },
      (finished) => {
        if (finished) {
          translateX.value = 0;
          runOnJS(removeTopCardJS)();
        }
      },
    );
  };

  const skipRecipe = () => {
    "worklet";
    translateX.value = withTiming(
      -SCREEN_WIDTH - 100,
      { duration: 600, easing: Easing.inOut(Easing.cubic) },
      (finished) => {
        if (finished) {
          translateX.value = 0;
          runOnJS(removeTopCardJS)();
        }
      },
    );
  };

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > 120) {
        saveRecipe();
      } else if (translateX.value < -120) {
        skipRecipe();
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 100,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-ROTATION, 0, ROTATION],
    );

    return {
      transform: [{ translateX: translateX.value }, { rotate: `${rotate}deg` }],
    };
  });

  const cardOffsetStyle = (index: number): ViewStyle => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: index + 1,
    alignSelf: "center",
  });

  // Prepare active card layers (max 2 rendered at any time for high performance)
  const cardsToRender: { recipe?: RecipeData; isTop: boolean; isLoading?: boolean; key: string }[] = [];
  
  if (recipeQueue.length > 0) {
    cardsToRender.push({
      recipe: recipeQueue[0],
      isTop: true,
      key: recipeQueue[0].id || "top",
    });

    if (recipeQueue.length > 1) {
      cardsToRender.push({
        recipe: recipeQueue[1],
        isTop: false,
        key: recipeQueue[1].id || "second",
      });
    } else if (isPreFetching) {
      cardsToRender.push({
        isTop: false,
        isLoading: true,
        key: "loading-placeholder",
      });
    }
  }

  // Reverse so that the top card is rendered last (placed on top of the layout)
  const stack = [...cardsToRender].reverse();

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {stack.map((item, index) => {
        const isTop = item.isTop;
        const card = (
          <Animated.View
            key={item.key}
            style={[cardOffsetStyle(index), isTop ? animatedStyle : null]}
          >
            <GenerationCardPreview
              title={item.recipe?.title}
              description={item.recipe?.description || ""}
              difficulty={item.recipe?.difficulty || ""}
              time={item.recipe?.time || ""}
              servings={item.recipe?.servings ?? null}
              steps={item.recipe?.instructions?.length || 0}
              tags={item.recipe?.tags || []}
              saveRecipe={saveRecipe}
              skipRecipe={skipRecipe}
              isLoading={item.isLoading}
            />
          </Animated.View>
        );

        return isTop ? (
          <GestureDetector gesture={pan} key={item.key}>
            {card}
          </GestureDetector>
        ) : (
          card
        );
      })}
    </View>
  );
};

export default PreviewAnimatedWrapper;
