import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useStyles } from "@/styles/GlobalStyles";
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
  interpolateColor,
} from "react-native-reanimated";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
type Props = {
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  selected: number;
  options: string[];
};

const SliderField = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const currentPillColor =
    props.selected === 0
      ? theme.yellowBlock
      : props.selected === 1
        ? theme.greenBlock
        : theme.blueBlock;
  const sliderPillShadow = useTintedBoxShadow(currentPillColor);
  const translateX = useSharedValue(0);

  const colorProgress = useSharedValue(props.selected);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      colorProgress.value,
      [0, 1, 2],
      [theme.yellowBlock, theme.greenBlock, theme.blueBlock],
    ),
  }));

  useEffect(() => {
    colorProgress.value = withTiming(props.selected, {
      duration: 300,
    });
    translateX.value = 30;

    translateX.value = withSequence(withTiming(0, { duration: 250 }));
  }, [props.selected]);

  function ChangeOption(direction: -1 | 1) {
    Haptics.selectionAsync();
    props.setSelected((current) => {
      let next = current;

      if (direction === -1) {
        next = current === 0 ? props.options.length - 1 : current - 1;
      } else {
        next = current === props.options.length - 1 ? 0 : current + 1;
      }

      return next;
    });
  }

  const swipe = Gesture.Pan()

    .onEnd((e) => {
      if (e.translationX > 80) {
        runOnJS(ChangeOption)(1);
      } else if (e.translationX < -80) {
        runOnJS(ChangeOption)(-1);
      }
      // position.value = withSpring(0);
    });
  return (
    <GestureDetector gesture={swipe}>
      <View style={{ gap: 33, flexDirection: "column" }}>
        <Animated.View
          style={[
            styles.sliderPill,

            sliderPillShadow,
            animatedColor,
            {
              // backgroundColor:
              //   props.selected === 0
              //     ? NEWCOLORS.greenBlock
              //     : props.selected === 1
              //       ? NEWCOLORS.orangeBlock
              //       : NEWCOLORS.purpblueBlock,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <Pressable
            onPress={() => {
              ChangeOption(-1);
            }}
          >
            <CustomIcon
              name="left-small"
              filled={true}
              color="grey"
              size={35}
            />
          </Pressable>

          <Animated.Text
            style={[
              styles.textCentered,
              animatedStyle,
              { fontFamily: "Nunito-SemiBold" },
            ]}
          >
            {props.options[props.selected]}
          </Animated.Text>
          <Pressable
            onPress={() => {
              ChangeOption(1);
            }}
          >
            <CustomIcon
              name="right-small"
              filled={true}
              color="grey"
              size={35}
            />
          </Pressable>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default SliderField;
