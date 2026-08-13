import { View, Text, Pressable } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
  ReduceMotion,
} from "react-native-reanimated";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { CustomIcon } from "@/icon-loader/icon-loader";

type Props = {
  value: boolean;
  onValueChange: (val: boolean) => void;
};

const SwitchToggle = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const trackLength = 60;
  const thumbSize = 24;
  const padding = 5;

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      props.value ? 1 : 0,
      [0, 1],
      [theme.yellowBlock, theme.blueBlock],
    );
    return { backgroundColor };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const maxTranslate = trackLength - thumbSize - padding;

    const backgroundColor = interpolateColor(
      props.value ? 1 : 0,
      [0, 1],
      [theme.yellowAccent, theme.blueAccent],
    );

    return {
      backgroundColor,
      transform: [
        {
          translateX: withTiming(props.value ? maxTranslate : padding, {
            duration: 200,
            reduceMotion: ReduceMotion.Never,
          }),
        },
      ],
    };
  });

  return (
    <Pressable onPress={() => props.onValueChange(!props.value)}>
      <Animated.View
        style={[
          styles.track,
          styles.basicBoxShadow,
          trackAnimatedStyle,
          { width: trackLength, justifyContent: "center" },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            styles.basicBoxShadow,
            thumbAnimatedStyle,
            {
              width: thumbSize,
              height: thumbSize,
              position: "absolute",
              left: 0,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <CustomIcon
            name={props.value ? "moon" : "sun"}
            color={theme.pureWhite}
            size={15}
            filled
          ></CustomIcon>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default SwitchToggle;
