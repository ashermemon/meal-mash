import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/auth.styles";
import AddIngredients from "./addingredients";
import emojiImages from "@/components/emoji-images";
import SearchContext from "@/contexts/SearchContext";
import IngredientsContext from "@/contexts/IngredientsContext";
import LeftoversEnabled from "@/contexts/LeftoversOn";
import LeftoversContext from "@/contexts/LeftoversContext";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "@/constants/theme";
import { runOnJS } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface IngredientProps {
  ingredientName: string;
  colorTing: string;
}

export default function IngredientCard(props: IngredientProps) {
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);

  var hsl = require("hsl-to-hex");
  const [hue] = useState(() => Math.random() * 359);
  const backgroundColor = hsl(hue, 88, 97);
  const strokeColor = hsl(hue, 45, 79);
  const [searchActive, setSearchActive] = useContext(SearchContext);
  const ingredientImage =
    emojiImages[props.ingredientName] || emojiImages.Default;

  const scale = useSharedValue(1);
  let upperCaseArrayL;
  let upperCaseArrayI;
  const animatedStyling = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  upperCaseArrayL = leftovers.map((str) => str.toUpperCase());
  upperCaseArrayI = ingredients.map((str) => str.toUpperCase());

  return upperCaseArrayI.includes(props.ingredientName.toUpperCase()) ||
    upperCaseArrayL.includes(props.ingredientName.toUpperCase()) ? null : (
    <Pressable
      onPressIn={() => {
        scale.value = withTiming(1.06);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      onPressOut={() => {
        scale.value = withTiming(1);
      }}
      onPress={() => {
        if (searchActive) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          if (leftoversEnabled) {
            setLeftovers((prev) => [...prev, props.ingredientName]);
          } else {
            setIngredients((prev) => [...prev, props.ingredientName]);
          }
        }
        setSearchActive(false);
      }}
    >
      <Animated.View
        style={[
          styles.ingredientResult,
          animatedStyling,
          {
            backgroundColor: COLORS[props.colorTing] ?? COLORS.searchGreyPicker,
          },
        ]}
      >
        <View style={styles.ingredientPanel}>
          <Text style={[styles.textLeftSemiBold, { marginLeft: 10 }]}>
            {props.ingredientName}
          </Text>

          <View
            style={[
              styles.emojiWrap,
              {
                borderColor: strokeColor,
                backgroundColor: backgroundColor,
              },
            ]}
          >
            <Image
              style={styles.ingredientEmoji}
              source={ingredientImage}
            ></Image>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
