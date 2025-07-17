import { styles } from "@/styles/auth.styles";
import { Pressable, View } from "react-native";
import AddIcon from "@/Icons/AddIcon";
import { COLORS } from "@/constants/theme";
import { useContext, useState } from "react";
import SearchContext from "@/contexts/SearchContext";
import LeftoversEnabled from "@/contexts/LeftoversOn";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

type CardProps = {
  bColor: string;
  leftover: boolean;
};

export default function NewCard(props: CardProps) {
  const [searchActive, setSearchActive] = useContext(SearchContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);
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
      targetColor = props.leftover
        ? COLORS.blueHeader
        : COLORS.greenButtonColor;
    } else {
      targetColor = props.leftover
        ? COLORS.addButtonColor
        : COLORS.addButtonColor;
    }

    return {
      backgroundColor: withTiming(targetColor),
      transform: [{ scale: withTiming(pressed.value ? 1.2 : 1) }],
    };
  });

  return (
    <Pressable
      style={[{ borderColor: COLORS.addButtonStroke }, styles.addContainer]}
      onPress={() => (
        setSearchActive(true),
        props.leftover ? setLeftoversEnabled(true) : setLeftoversEnabled(false)
      )}
    >
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[styles.addButton, animatedStyles]}
          onTouchStart={() => (
            setSearchActive(true),
            props.leftover
              ? setLeftoversEnabled(true)
              : setLeftoversEnabled(false)
          )}
        >
          <AddIcon iconsetcolor={COLORS.addPlusGrey} setheight={35}></AddIcon>
        </Animated.View>
      </GestureDetector>
    </Pressable>
  );
}
