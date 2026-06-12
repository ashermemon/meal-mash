import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import * as Haptics from "expo-haptics";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  ReduceMotion,
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  runOnJS,
  withSequence,
  withSpring,
} from "react-native-reanimated";
type Props = {
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  selected: number;
  options: string[];
};

const SliderField = (props: Props) => {
  const translateX = useSharedValue(0);
  const position = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    translateX.value = 30;

    translateX.value = withSequence(withTiming(0, { duration: 250 }));
  }, [props.selected]);

  function ChangeOption(direction: -1 | 1) {
    Haptics.selectionAsync();
    props.setSelected((current) => {
      if (direction === -1) {
        return current === 0 ? props.options.length - 1 : current - 1;
      }

      return current === props.options.length - 1 ? 0 : current + 1;
    });
  }

  const swipe = Gesture.Pan()
    .onUpdate((e) => {
      position.value = e.translationX;
    })
    .onEnd((e) => {
      if (position.value > 80) {
        runOnJS(ChangeOption)(1);
      } else if (position.value < -80) {
        runOnJS(ChangeOption)(-1);
      } else {
        position.value = withSpring(0);
      }
    });
  return (
    <GestureDetector gesture={swipe}>
      <View style={{ gap: 33, flexDirection: "column" }}>
        <View
          style={[
            styles.sliderPill,
            styles.basicBoxShadow,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <Pressable
            onPress={() => {
              ChangeOption(1);
            }}
          >
            <CustomIcon
              name="left-small"
              filled={true}
              color="grey"
              size={35}
            />
          </Pressable>

          <Animated.Text style={[styles.textCentered, animatedStyle]}>
            {props.options[props.selected]}
          </Animated.Text>
          <Pressable
            onPress={() => {
              ChangeOption(-1);
            }}
          >
            <CustomIcon
              name="right-small"
              filled={true}
              color="grey"
              size={35}
            />
          </Pressable>
        </View>
      </View>
    </GestureDetector>
  );
};

export default SliderField;
