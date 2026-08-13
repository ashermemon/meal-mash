import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
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
  const maxTranslate = trackLength - thumbSize - padding;

  const progress = useSharedValue(props.value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(props.value ? 1 : 0, {
      duration: 350,
      reduceMotion: ReduceMotion.Never,
    });
  }, [props.value]);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [theme.yellowBlock, theme.blueBlock],
      ),
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [theme.yellowAccent, theme.blueAccent],
      ),
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [padding, maxTranslate],
          ),
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
