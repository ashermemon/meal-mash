import {
  Alert,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Animated, {
  Easing,
  FadeInDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import AppImage from "@/components/universal/AppImage";
import * as Haptics from "expo-haptics";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { saveRecipe, equal } from "@/components/features/recipe/SaveRecipe";
import { router } from "expo-router";
import RecipeContext, { type RecipeData } from "@/contexts/RecipeContext";
import RecipeInfoTags from "../recipe/RecipeInfoTags";
import { useMealImages } from "@/contexts/MealImageContext";
import { getMealImageSource } from "@/utils/mealImageSource";
import InfoTag from "../recipe/InfoTag";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import {
  consumePendingRestore,
  isEntranceWindowOpen,
  markPendingRestore,
  recipeKey,
} from "./savedCardAnimation";

type SavedProps = {
  SavedRecipe: RecipeData;

  gap?: number;

  onBeforeListChange?: () => void;
};

type CardPhase = "idle" | "removing" | "restoring";

const REMOVE_DURATION = 300;

const SETTLE_EASING = Easing.bezier(0.4, 0, 0.2, 1);
const FADE_OUT_DURATION = 200;
const RESTORE_DURATION = 280;
const ENTER_DURATION = 280;

const ALERT_DELAY = 10;

export default function SavedCard(props: SavedProps) {
  const styles = useStyles();
  const theme = useTheme();
  const cardShadow = useTintedBoxShadow(theme.greyBlock);
  const imageGlowShadow = useTintedBoxShadow(theme.backgroundColor, "glow");
  const [saved, setSaved] = useState(true);
  const [savesRecipes, setSavesRecipes] = useContext(SavedRecipesContext);
  const [recipeData, setRecipeData] = useContext(RecipeContext);
  const { mealImages } = useMealImages();
  const imageSource = useMemo(
    () => getMealImageSource(mealImages, props.SavedRecipe.imageCategory),
    [mealImages, props.SavedRecipe.imageCategory],
  );

  const cardKey = recipeKey(props.SavedRecipe);
  const gap = props.gap ?? 20;

  const naturalHeight = useRef(0);
  const isAnimating = useRef(false);
  const restoreHeight = useRef<number | undefined>(undefined);
  const pendingRemoval = useRef<{ index: number; height: number } | null>(null);

  const [phase, setPhase] = useState<CardPhase>(() => {
    if (restoreHeight.current === undefined) {
      restoreHeight.current = consumePendingRestore(cardKey);
    }
    return restoreHeight.current === undefined ? "idle" : "restoring";
  });

  const [entering] = useState(() =>
    restoreHeight.current === undefined && isEntranceWindowOpen()
      ? FadeInDown.duration(ENTER_DURATION).easing(Easing.out(Easing.cubic))
      : undefined,
  );

  const cardHeight = useSharedValue(0);
  const cardOpacity = useSharedValue(
    restoreHeight.current === undefined ? 1 : 0,
  );
  const cardGap = useSharedValue(restoreHeight.current === undefined ? gap : 0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const animatedStyle = useAnimatedStyle(() => ({
    height: cardHeight.value,
    opacity: cardOpacity.value,
    paddingBottom: cardGap.value,
  }));

  useEffect(() => {
    setSaved(savesRecipes.some((r) => equal(r, props.SavedRecipe)));
  }, [props.SavedRecipe, savesRecipes]);

  useEffect(() => {
    const height = restoreHeight.current;
    if (height === undefined) return;

    naturalHeight.current = height;
    cardHeight.value = 0;
    cardOpacity.value = 0;
    cardGap.value = 0;
    cardGap.value = withTiming(gap, {
      duration: RESTORE_DURATION,
      easing: SETTLE_EASING,
    });
    cardHeight.value = withTiming(
      height,
      { duration: RESTORE_DURATION, easing: SETTLE_EASING },
      (finished) => {
        if (finished) runOnJS(setPhase)("idle");
      },
    );
    cardOpacity.value = withTiming(1, {
      duration: ENTER_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const renderedKey = useRef(cardKey);
  useEffect(() => {
    if (renderedKey.current === cardKey) return;
    renderedKey.current = cardKey;
    isAnimating.current = false;
    pendingRemoval.current = null;
    cardHeight.value = 0;
    cardOpacity.value = 1;
    cardGap.value = gap;
    setPhase("idle");
  }, [cardKey, cardHeight, cardOpacity, cardGap, gap]);

  const handleLayout = (event: LayoutChangeEvent) => {
    if (phaseRef.current === "idle") {
      naturalHeight.current = event.nativeEvent.layout.height;
    }
  };

  const commitRemoval = (originalIndex: number, height: number) => {
    const recipeToRestore = props.SavedRecipe;
    const title = recipeToRestore.title
      ? recipeToRestore.title.trim()
      : "Recipe";

    props.onBeforeListChange?.();
    saveRecipe(recipeToRestore, setSavesRecipes);

    setTimeout(() => {
      Alert.alert("Removed from Saves", `${title} was removed from saves.`, [
        { text: "OK", style: "cancel" },
        {
          text: "Undo",
          onPress: () => {
            markPendingRestore(recipeKey(recipeToRestore), height);
            props.onBeforeListChange?.();
            saveRecipe(recipeToRestore, setSavesRecipes, originalIndex);
          },
        },
      ]);
    }, ALERT_DELAY);
  };

  const beginRemoval = (originalIndex: number) => {
    if (isAnimating.current) return;
    const height = naturalHeight.current;
    if (height <= 0) {
      // Never measured (shouldn't happen) - just remove it.
      commitRemoval(originalIndex, 0);
      return;
    }
    isAnimating.current = true;
    pendingRemoval.current = { index: originalIndex, height };
    cardHeight.value = height;
    cardOpacity.value = 1;
    cardGap.value = gap;
    setPhase("removing");
  };

  // Started once the collapsing style is actually attached, so the card doesn't
  // jump a few pixels before it starts shrinking.
  useEffect(() => {
    if (phase !== "removing") return;
    const pending = pendingRemoval.current;
    if (!pending) return;
    cardOpacity.value = withTiming(0, {
      duration: FADE_OUT_DURATION,
      easing: Easing.out(Easing.quad),
    });
    cardGap.value = withTiming(0, {
      duration: REMOVE_DURATION,
      easing: SETTLE_EASING,
    });
    cardHeight.value = withTiming(
      0,
      { duration: REMOVE_DURATION, easing: SETTLE_EASING },
      (finished) => {
        if (finished) runOnJS(commitRemoval)(pending.index, pending.height);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const saveCard = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (!saved) {
      const title = props.SavedRecipe.title
        ? props.SavedRecipe.title.trim()
        : "Recipe";
      saveRecipe(props.SavedRecipe, setSavesRecipes);
      Alert.alert("Saved", `${title} was saved.`);
      return;
    }

    beginRemoval(savesRecipes.findIndex((r) => equal(r, props.SavedRecipe)));
  };
  const displayTime = props.SavedRecipe.time.replace(
    /\b(min|mins|minute|minutes)\b/gi,
    "m",
  );
  const handleCardPress = () => {
    Haptics.selectionAsync();
    setRecipeData(props.SavedRecipe);
    router.navigate("/followRecipe");
  };

  return (
    <Animated.View
      entering={entering}
      onLayout={handleLayout}
      pointerEvents={phase === "removing" ? "none" : "auto"}
      style={[
        { paddingBottom: gap },
        phase !== "idle" && animatedStyle,
        phase !== "idle" && { overflow: "hidden" as const },
      ]}
    >
      <Pressable
        style={[
          styles.homeBlock,
          cardShadow,
          { backgroundColor: theme.greyBlock, position: "relative" },
          // While the wrapper is collapsing the card is taken out of the flow so
          // its own height never changes - otherwise the squeezed row would
          // re-center the meal image while the text stayed put.
          phase !== "idle" && localStyles.pinnedCard,
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
                <AppImage
                  source={imageSource}
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
    </Animated.View>
  );
}

const localStyles = StyleSheet.create({
  pinnedCard: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
