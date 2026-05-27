import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Animated } from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "@/constants/Theme";
import { NEWCOLORS } from "@/constants/NewTheme";

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  initialValue?: boolean;
  size?: number;
  borderRadius?: number;
}

export default function CustomCheckbox({
  checked,
  onChange,
  initialValue = false,
  size = 24,
  borderRadius = 7,
}: CustomCheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(initialValue);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const animation = useRef(new Animated.Value(isChecked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: isChecked ? 1 : 0,
      friction: 8,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }, [isChecked]);

  const handlePress = () => {
    const nextState = !isChecked;
    if (onChange) {
      onChange(nextState);
    } else {
      setInternalChecked(nextState);
    }
  };

  const uncheckedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const checkedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const checkedScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.pressable,
        {
          width: size,
          height: size,
          transform: [{ scale: pressed ? 0.94 : 1.0 }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.uncheckedLayer,
          {
            borderRadius,
            opacity: uncheckedOpacity,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.checkedLayer,
          {
            borderRadius,
            opacity: checkedOpacity,
            transform: [{ scale: checkedScale }],
          },
        ]}
      >
        <Svg
          width={Math.round(size * 0.58)}
          height={Math.round(size * 0.58)}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            d="M20 6L9 17L4 12"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  uncheckedLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F2F2F5",
    borderWidth: 2.5,
    borderColor: "#C4C4C6",
  },
  checkedLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: NEWCOLORS.greenAccent,
    borderWidth: 1.5,
    borderColor: NEWCOLORS.greenAccent,
    justifyContent: "center",
    alignItems: "center",
  },
});
