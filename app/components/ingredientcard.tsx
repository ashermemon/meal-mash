import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/auth.styles";
import AddIngredients from "./addingredients";
import emojiImages from "./emoji-images";
import SearchContext from "../contexts/SearchContext";
import IngredientsContext from "../contexts/IngredientsContext";
import LeftoversEnabled from "../contexts/LeftoversOn";
import LeftoversContext from "../contexts/LeftoversContext";
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

  const animatedStyling = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return ingredients.includes(props.ingredientName) ||
    leftovers.includes(props.ingredientName) ? null : (
    <Pressable
      onPressIn={() => {
        scale.value = withTiming(1.06);
      }}
      onPressOut={() => {
        scale.value = withTiming(1);
      }}
      onPress={() => {
        if (searchActive) {
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
          <View style={styles.ingredientFlex}>
            <Text style={[styles.textLeftSemiBold]}>
              {props.ingredientName}
            </Text>
          </View>
          <View style={styles.ingredientFlexEmoji}>
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
        </View>
      </Animated.View>
    </Pressable>
  );
}
