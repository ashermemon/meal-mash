import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { COLORS } from "@/constants/Theme";
import { Image } from "expo-image";
import emojiImages from "@/components/universal/EmojiImages";

import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { saveRecipe, equal } from "@/components/features/recipe/SaveRecipe";
import { router } from "expo-router";
import RecipeContext, { type RecipeData } from "@/contexts/RecipeContext";

type SavedProps = {
  SavedRecipe: RecipeData;
};

export default function SavedCard(props: SavedProps) {
  const [saved, setSaved] = useState(true);
  const [savesRecipes, setSavesRecipes] = useContext(SavedRecipesContext);
  const [recipeData, setRecipeData] = useContext(RecipeContext);

  useEffect(() => {
    setSaved(savesRecipes.some((r) => equal(r, props.SavedRecipe)));
  }, [props.SavedRecipe, savesRecipes]);

  const saveCard = () => {
    saveRecipe(props.SavedRecipe, setSavesRecipes);

    alert(`
      ${props.SavedRecipe.title} was ${
        saved ? `removed from saves` : `saved`
      }`);
  };
  const pressed = useSharedValue<boolean>(false);
  const handleCardPress = () => {
    setRecipeData(props.SavedRecipe);
    router.push("/followRecipe");
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
      runOnJS(handleCardPress)();
    });
  const animatedStyles = useAnimatedStyle(() => {
    let targetColor;

    if (pressed.value) {
      targetColor = COLORS.genFill;
    } else {
      targetColor = "white";
    }

    return {
      backgroundColor: withTiming(targetColor),
    };
  });
  return (
    <>
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.favRecipe, animatedStyles]}>
          <View style={styles.ingredientPanelFav}>
            <View
              style={[
                styles.emojiWrapCard,
                {
                  borderColor: COLORS.genBorder,
                  backgroundColor: COLORS.genFill,
                },
              ]}
            >
              <Image
                style={styles.ingredientEmoji}
                source={emojiImages.Default}
              ></Image>
            </View>

            <View style={styles.ingredientFlexCard}>
              <Text
                style={[styles.textLeftBold, { fontSize: 13, width: "100%" }]}
              >
                {props.SavedRecipe.title}
              </Text>
            </View>
            <View style={styles.favFlex}>
              <Pressable onPress={() => saveCard()}>
                {saved ? (
                  <CustomIcon
                    name="bookmark"
                    filled={true}
                    color={COLORS.saveBorder}
                    size={30}
                  />
                ) : (
                  <CustomIcon
                    name="bookmark"
                    filled={false}
                    color={COLORS.saveBorder}
                    size={30}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}
