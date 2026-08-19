import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
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
import RecipeInfoTags from "../recipe/RecipeInfoTags";
import { MEAL_IMAGES } from "@/app/followRecipe";
import InfoTag from "../recipe/InfoTag";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";

type SavedProps = {
  SavedRecipe: RecipeData;
};

export default function SavedCard(props: SavedProps) {
  const styles = useStyles();
  const theme = useTheme();
  const cardShadow = useTintedBoxShadow(theme.greyBlock);
  const imageGlowShadow = useTintedBoxShadow(theme.backgroundColor, "glow");
  const [saved, setSaved] = useState(true);
  const [savesRecipes, setSavesRecipes] = useContext(SavedRecipesContext);
  const [recipeData, setRecipeData] = useContext(RecipeContext);

  useEffect(() => {
    setSaved(savesRecipes.some((r) => equal(r, props.SavedRecipe)));
  }, [props.SavedRecipe, savesRecipes]);

  const saveCard = () => {
    const wasSaved = saved;
    const recipeToRestore = props.SavedRecipe;
    saveRecipe(recipeToRestore, setSavesRecipes);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const title = props.SavedRecipe.title
      ? props.SavedRecipe.title.trim()
      : "Recipe";

    if (wasSaved) {
      Alert.alert("Removed from Saves", `${title} was removed from saves.`, [
        { text: "OK", style: "cancel" },
        {
          text: "Undo",
          onPress: () => saveRecipe(recipeToRestore, setSavesRecipes),
        },
      ]);
    } else {
      Alert.alert("Saved", `${title} was saved.`);
    }
  };
  const displayTime = props.SavedRecipe.time.replace(
    /\b(min|mins|minute|minutes)\b/gi,
    "m",
  );
  const pressed = useSharedValue<boolean>(false);
  const handleCardPress = () => {
    Haptics.selectionAsync();
    setRecipeData(props.SavedRecipe);
    router.navigate("/followRecipe");
  };

  return (
    <>
      <Pressable
        style={[
          styles.homeBlock,
          cardShadow,
          { backgroundColor: theme.greyBlock, position: "relative" },
        ]}
        onPress={handleCardPress}
      >
        <Pressable
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          onPress={() => saveCard()}
          style={{ position: "absolute", top: 15, right: 15, zIndex: 10 }}
        >
          {saved ? (
            <CustomIcon
              name="bookmark"
              filled={true}
              color={theme.redAccent}
              size={20}
            />
          ) : (
            <CustomIcon
              name="bookmark"
              filled={false}
              color={theme.basicText}
              size={30}
            />
          )}
        </Pressable>
        <View style={styles.ingredientPanelFav}>
          <View
            style={[
              {
                flex: 1,
                padding: 10,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={[
                  imageGlowShadow,
                  { width: 70, height: 70, borderRadius: 110 },
                ]}
              >
                <Image
                  source={
                    MEAL_IMAGES[props.SavedRecipe.imageCategory] ||
                    MEAL_IMAGES.bowl
                  }
                  style={{ width: "100%", height: "100%", borderRadius: 110 }}
                  contentFit="cover"
                />
              </View>
              <View style={{ flex: 1, paddingHorizontal: 20, gap: 7 }}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={[styles.textLeftBold, { fontSize: 17 }]}
                >
                  {props.SavedRecipe.title}
                </Text>
                <Text
                  numberOfLines={4}
                  style={[
                    styles.basicTextLeft,
                    {
                      fontSize: 11,

                      color: theme.fontColor,
                    },
                  ]}
                >
                  {props.SavedRecipe.description}
                </Text>
              </View>
              <View
                style={{
                  marginRight: -20,
                  alignSelf: "flex-start",
                  marginTop: 30,
                }}
              >
                <View style={{ gap: 10 }}>
                  <View
                    style={[
                      styles.saveTag,
                      {
                        backgroundColor:
                          props.SavedRecipe.difficulty.toLowerCase() === "easy"
                            ? theme.greenBlock
                            : props.SavedRecipe.difficulty.toLowerCase() ===
                                "moderate"
                              ? theme.blueBlock
                              : props.SavedRecipe.difficulty.toLowerCase() ===
                                  "expert"
                                ? theme.redBlock
                                : theme.yellowBlock,
                      },
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.textCenterBold,
                        { fontSize: 11, fontFamily: "Nunito-SemiBold" },
                      ]}
                    >
                      {props.SavedRecipe.difficulty}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.saveTag,
                      {
                        backgroundColor: theme.orangeBlock,
                      },
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.textCenterBold,
                        { fontSize: 11, fontFamily: "Nunito-SemiBold" },
                      ]}
                    >
                      {displayTime}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.saveTag,
                      {
                        backgroundColor: theme.purpblueBlock,
                      },
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.textCenterBold,
                        { fontSize: 11, fontFamily: "Nunito-SemiBold" },
                      ]}
                    >
                      {props.SavedRecipe.tags[0]}
                    </Text>
                  </View>
                </View>
              </View>
              {/* <RecipeInfoTags
                difficulty={props.SavedRecipe.difficulty}
                time={props.SavedRecipe.time}
                tags={props.SavedRecipe.tags}
                marginTop={8}
              /> */}
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
}
