import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import emojiImages from "@/components/universal/emoji-images";

import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import { storage } from "@/utils/storage";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { CustomIcon } from "@/icon-loader/icon-loader";

type SavedProps = {
  SavedRecipe: string;
};

export default function SavedCard(props: SavedProps) {
  const [saved, setSaved] = useState(true);
  const [savesRecipes, setSavesRecipes] = useContext(SavedRecipesContext);

  useEffect(() => {
    setSaved(savesRecipes.includes(props.SavedRecipe));
  }, [props.SavedRecipe, savesRecipes]);

  let updatedSaves: string[];

  const saveCard = () => {
    const ingredientName = props.SavedRecipe;
    const isCurrentlyFavorite = savesRecipes.includes(ingredientName);

    if (isCurrentlyFavorite) {
      updatedSaves = savesRecipes.filter((name) => name !== ingredientName);
    } else {
      updatedSaves = [...savesRecipes, ingredientName];
    }

    setSavesRecipes(updatedSaves);
    storage.set("saves", JSON.stringify(updatedSaves));

    alert(`
      ${props.SavedRecipe} was ${
      saved ? `was removed from saves` : `was saved`
    }`);
  };
  const pressed = useSharedValue<boolean>(false);
  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });
  const animatedStyles = useAnimatedStyle(() => {
    let targetColor;

    if (pressed.value) {
      targetColor = "#fcf5ff";
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
                  backgroundColor: "#fcf5ff",
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
                {props.SavedRecipe}
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
