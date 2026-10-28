import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import { hexToRgba } from "@/utils/color";

export type DemoProps = {
  width: number;
  height: number;
  active: boolean;
};

export const DEMO_BASE_HEIGHT = 220;

export const EASE = Easing.inOut(Easing.cubic);

export const timing = (value: number, instant: boolean, duration = 450) =>
  instant ? value : withTiming(value, { duration, easing: EASE });

export function useDemoCycle(durations: number[], active: boolean) {
  const [state, setState] = useState({ step: 0, loop: 0 });

  useEffect(() => {
    setState((prev) => ({ step: 0, loop: prev.loop }));
    if (!active) return;

    let current = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const advance = () => {
      timeout = setTimeout(() => {
        const next = (current + 1) % durations.length;
        current = next;
        setState((prev) => ({
          step: next,
          loop: next === 0 ? prev.loop + 1 : prev.loop,
        }));
        advance();
      }, durations[current]);
    };
    advance();

    return () => clearTimeout(timeout);
  }, [active]);

  return state;
}

export const useDemoLoop = (durations: number[], active: boolean) =>
  useDemoCycle(durations, active).step;

export function DemoStage({
  width,
  height,
  visible,
  children,
}: {
  width: number;
  height: number;
  visible: boolean;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const shadow = useTintedBoxShadow(theme.greyBlock);
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible]);

  const contentStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const radius = height * 0.11;

  return (
    <View
      pointerEvents="none"
      style={[shadow, { width, height, borderRadius: radius }]}
    >
      <View
        style={{
          flex: 1,
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: theme.greyBlock,
        }}
      >
        <Animated.View style={[{ flex: 1 }, contentStyle]}>
          {children}
        </Animated.View>
      </View>
    </View>
  );
}

export function TapDot({
  x,
  y,
  visible,
  pressing,
  instant,
  unit,
  moveDuration = 500,
}: {
  x: number;
  y: number;
  visible: boolean;
  pressing: boolean;
  instant: boolean;
  unit: number;
  moveDuration?: number;
}) {
  const theme = useTheme();
  const size = 30 * unit;
  const posX = useSharedValue(x);
  const posY = useSharedValue(y);
  const opacity = useSharedValue(0);
  const press = useSharedValue(1);
  const ripple = useSharedValue(1);

  useEffect(() => {
    posX.value = timing(x, instant, moveDuration);
    posY.value = timing(y, instant, moveDuration);
  }, [x, y, instant]);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 220 });
  }, [visible]);

  useEffect(() => {
    press.value = withSpring(pressing ? 0.86 : 1, {
      damping: 22,
      stiffness: 320,
    });
    if (pressing) {
      ripple.value = 0;
      ripple.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.quad) });
    }
  }, [pressing]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: posX.value - size / 2 },
      { translateY: posY.value - size / 2 },
      { scale: press.value },
    ],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    opacity: (1 - ripple.value) * 0.4,
    transform: [{ scale: 1 + ripple.value * 0.7 }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: 0,
          top: 0,
          width: size,
          height: size,
          zIndex: 50,
        },
        dotStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: hexToRgba(theme.basicText, 0.35),
          },
          rippleStyle,
        ]}
      />
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: hexToRgba(theme.basicText, 0.3),
          borderWidth: 2.5 * unit,
          borderColor: hexToRgba(theme.pureWhite, 0.95),
        }}
      />
    </Animated.View>
  );
}
