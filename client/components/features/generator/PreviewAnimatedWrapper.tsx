import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Dimensions } from "react-native";
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
import Prompt from "@/constants/prompt";
import generateConstraints from "@/constants/constraints";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";
import { storage } from "@/utils/storage";
import { router } from "expo-router";

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

type SwipableCardProps = {
  recipe?: RecipeData;
  isTop: boolean;
  isLoading?: boolean;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onSwipeRightStart?: () => void;
};

const SwipableCard = ({
  recipe,
  isTop,
  isLoading,
  onSwipeRight,
  onSwipeLeft,
  onSwipeRightStart,
}: SwipableCardProps) => {
  const isSwipingRef = useRef(false);
  const translateX = useSharedValue(0);
  const ROTATION = 10;

  const markSwiping = () => {
    isSwipingRef.current = true;
  };

  const makeRecipe = () => {
    if (!isSwipingRef.current) {
      router.push("/followRecipe");
    }
  };

  const saveRecipe = () => {
    "worklet";
    if (onSwipeRightStart) {
      runOnJS(onSwipeRightStart)();
    }
    runOnJS(markSwiping)();
    translateX.value = withTiming(
      SCREEN_WIDTH + 100,
      { duration: 400, easing: Easing.inOut(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(onSwipeRight)();
        }
      },
    );
  };

  const skipRecipe = () => {
    "worklet";
    runOnJS(markSwiping)();
    translateX.value = withTiming(
      -SCREEN_WIDTH - 100,
      { duration: 600, easing: Easing.inOut(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(onSwipeLeft)();
        }
      },
    );
  };

  const pan = Gesture.Pan()
    .enabled(isTop && !isLoading)
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

  const card = (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: isTop ? 2 : 1,
          alignSelf: "center",
        },
        isTop ? animatedStyle : null,
      ]}
    >
      <GenerationCardPreview
        title={recipe?.title}
        description={recipe?.description || ""}
        difficulty={recipe?.difficulty || ""}
        time={recipe?.time || ""}
        servings={recipe?.servings ?? null}
        steps={recipe?.instructions?.length || 0}
        tags={recipe?.tags || []}
        saveRecipe={saveRecipe}
        skipRecipe={skipRecipe}
        isLoading={isLoading}
        imageCategory={recipe?.imageCategory || "bowl"}
        nutrients={recipe?.nutrients || [0, 0, 0]}
        makeRecipe={makeRecipe}
      />
    </Animated.View>
  );

  return <GestureDetector gesture={pan}>{card}</GestureDetector>;
};

const PreviewAnimatedWrapper = (props: Props) => {
  const [savedRecipes, setSavedRecipes] = useContext(SavedRecipesContext);
  const [recipeData, setRecipeData] = useContext(RecipeContext);
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);

  const [recipeQueue, setRecipeQueue] = useState<RecipeData[]>([]);
  const [isPreFetching, setIsPreFetching] = useState(false);
  const [generationDetails, setGenerationDetails] = useContext(GenerationDetailsContext);



  const mealsLeftRef = useRef(mealsLeft);
  useEffect(() => {
    mealsLeftRef.current = mealsLeft;
  }, [mealsLeft]);

  useEffect(() => {
    if (recipeData && recipeData.title && recipeQueue.length === 0) {
      setRecipeQueue([recipeData]);
    }
  }, [recipeData]);


  useEffect(() => {
    if (recipeQueue.length > 0) {
      setRecipeData(recipeQueue[0]);
    }
  }, [recipeQueue[0]?.id]);


  const prefetchNextRecipe = async () => {
    if (mealsLeftRef.current <= 0) {
      console.warn("Out of meals left. Skipping background generation.");
      return;
    }
    if (isPreFetching) return;




    setIsPreFetching(true);
    try {
      const nextConstraints = generateConstraints();
      const nextPrompt = Prompt({
        ingredients: generationDetails.ingredients || [],
        leftovers: generationDetails.leftovers || [],
        isChecked: generationDetails.isChecked || false,
        mealType: nextConstraints[0],
        mealTexture: nextConstraints[1],
        mealMethod: nextConstraints[2],
      });

      const ai = new GoogleGenAI({ apiKey: APIKEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: nextPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: RecipeSchema,
        },
      });

      if (response.text) {
        const parsedRecipe = JSON.parse(response.text);
        console.log(parsedRecipe.imageCategory);
        const newRecipe: RecipeData = {
          id: `recipe_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          prompt: nextPrompt,
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
          imageCategory: parsedRecipe.imageCategory,
        };

        const totalMeals = storage.getNumber("mealsnumber") ?? 0;
        storage.set("mealsnumber", totalMeals + 1);

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


  useEffect(() => {
    if (recipeQueue.length < 2 && !isPreFetching) {
      prefetchNextRecipe();
    }
  }, [recipeQueue.length, isPreFetching]);

  const handleSwipeFinished = (recipe: RecipeData) => {
    setRecipeQueue((prev) => prev.filter((r) => r.id !== recipe.id));
    setMealsLeft((prev) => Math.max(0, prev - 1));
  };

  const handleSaveRecipeJS = (recipe: RecipeData) => {
    persistRecipe(recipe, setSavedRecipes);
  };


  const cardsToRender: { recipe?: RecipeData; isTop: boolean; isLoading?: boolean; key: string }[] = [];

  if (recipeQueue.length === 0) {
    cardsToRender.push({
      isTop: true,
      isLoading: true,
      key: "loading-top",
    });
  } else {
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
    } else if (mealsLeft > 0) {
      cardsToRender.push({
        isTop: false,
        isLoading: true,
        key: "loading-under",
      });
    }
  }

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
      {stack.map((item) => (
        <SwipableCard
          key={item.key}
          recipe={item.recipe}
          isTop={item.isTop}
          isLoading={item.isLoading}
          onSwipeRight={() => item.recipe && handleSwipeFinished(item.recipe)}
          onSwipeLeft={() => item.recipe && handleSwipeFinished(item.recipe)}
          onSwipeRightStart={() => item.recipe && handleSaveRecipeJS(item.recipe)}
        />
      ))}
    </View>
  );
};

export default PreviewAnimatedWrapper;
