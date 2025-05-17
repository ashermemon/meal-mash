import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import React, { useContext, useState } from "react";
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

interface IngredientProps {
  ingredientName: string;
}

export default function IngredientCard(props: IngredientProps) {
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);

  var hsl = require("hsl-to-hex");
  const [hue] = useState(() => Math.random() * 359);
  const backgroundColor = hsl(hue, 88, 97);
  const strokeColor = hsl(hue, 45, 79);
  const setSearchActive = useContext(SearchContext);
  const ingredientImage =
    emojiImages[props.ingredientName] || emojiImages.Default;
  const pressed = useSharedValue<boolean>(false);
  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(pressed.value ? 1.06 : 1) }],
    };
  });

  return ingredients.includes(props.ingredientName) ||
    leftovers.includes(props.ingredientName) ? (
    <></>
  ) : (
    <GestureHandlerRootView style={{ width: "100%" }}>
      <GestureDetector gesture={tap}>
        <Animated.View style={animatedStyles}>
          <Pressable
            style={styles.ingredientResult}
            onPress={() => [
              setSearchActive(false),
              leftoversEnabled
                ? setLeftovers((prev) => [...prev, props.ingredientName])
                : setIngredients((prev) => [...prev, props.ingredientName]),
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
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
