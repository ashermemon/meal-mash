import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  FadeInDown,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Text } from "@/components/universal/AppText";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { getTintedBoxShadow } from "@/utils/shadow";
import { CustomIcon } from "@/icon-loader/icon-loader";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import {
  DEMO_BASE_HEIGHT,
  DemoProps,
  DemoStage,
  TapDot,
  timing,
  useDemoLoop,
} from "./demoKit";

const SEARCH_TEXT = "Chicken";
const STARTING_TAGS = [
  { name: "Leftover Pizza", icon: "Pizza", leftover: true },
  { name: "Eggs", icon: "Eggs", leftover: false },
];
const NEW_TAG = { name: "Chicken", icon: "Chicken", leftover: false };

export default function PantryDemo({ width, height, active }: DemoProps) {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const unit = height / DEMO_BASE_HEIGHT;
  const step = useDemoLoop([500, 600, 300, 1100, 700, 350, 1800, 400], active);
  const instant = step === 0;

  const [typed, setTyped] = useState(0);
  const results = useSharedValue(0);

  useEffect(() => {
    if (step === 0 || step === 6) setTyped(0);
    if (step !== 3) return;
    const interval = setInterval(
      () => setTyped((n) => Math.min(n + 1, SEARCH_TEXT.length)),
      120,
    );
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    results.value = timing(step === 4 || step === 5 ? 1 : 0, instant, 280);
  }, [step]);

  const pad = 16 * unit;
  const barHeight = 44 * unit;
  const rowHeight = 40 * unit;
  const listTop = pad + barHeight + 14 * unit;
  const plusSize = 26 * unit;
  const plusX = width - pad - 12 * unit - plusSize / 2;
  const resultsTop = pad + barHeight + 6 * unit;

  const tags = step === 6 ? [NEW_TAG, ...STARTING_TAGS] : STARTING_TAGS;
  const focused = step >= 2 && step <= 5;

  const resultsStyle = useAnimatedStyle(() => ({
    opacity: results.value,
  }));

  const dotAtBar = step === 1 || step === 2;
  const dotAtPlus = step === 4 || step === 5;

  const textStyle = {
    fontSize: 14 * unit,
    fontFamily: "Nunito-SemiBold",
    color: theme.basicText,
  };

  return (
    <DemoStage width={width} height={height} visible={step !== 7}>
      <View
        style={{
          position: "absolute",
          left: pad,
          right: pad,
          top: pad,
          height: barHeight,
          borderRadius: barHeight / 2,
          backgroundColor: theme.cardWhite,
          borderWidth: 2 * unit,
          borderColor: focused ? theme.primary : "transparent",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 14 * unit,
          gap: 8 * unit,
        }}
      >
        <CustomIcon
          name="search-2"
          filled={false}
          color={theme.placeholderText}
          size={18 * unit}
        />
        <Text
          maxFontSizeMultiplier={1}
          numberOfLines={1}
          style={[
            styles.textLeft,
            textStyle,
            typed === 0 && { color: theme.placeholderText },
          ]}
        >
          {typed === 0 ? "Search Ingredients" : SEARCH_TEXT.slice(0, typed)}
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          left: pad,
          right: pad,
          top: listTop,
          gap: 8 * unit,
        }}
      >
        {tags.map((tag) => (
          <Animated.View
            key={tag.name}
            entering={instant ? undefined : FadeInDown.duration(320)}
            layout={instant ? undefined : LinearTransition.duration(320)}
            style={{
              height: rowHeight,
              borderRadius: 12 * unit,
              backgroundColor: theme.cardWhite,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12 * unit,
              gap: 10 * unit,
            }}
          >
            <AppImage
              source={icons3d[tag.icon]}
              style={{ width: 26 * unit, height: 26 * unit }}
              contentFit="contain"
            />
            <Text
              maxFontSizeMultiplier={1}
              numberOfLines={1}
              style={[styles.textLeft, textStyle, { flex: 1 }]}
            >
              {tag.name}
            </Text>
            {tag.leftover ? (
              <View
                style={{
                  backgroundColor: theme.orangeBlock,
                  borderRadius: 999,
                  paddingHorizontal: 8 * unit,
                  paddingVertical: 2 * unit,
                }}
              >
                <Text
                  maxFontSizeMultiplier={1}
                  style={[
                    styles.textCentered,
                    { fontSize: 10 * unit, fontFamily: "Nunito-Bold" },
                  ]}
                >
                  Leftover
                </Text>
              </View>
            ) : null}
          </Animated.View>
        ))}
      </View>

      <Animated.View
        style={[
          getTintedBoxShadow(theme.cardWhite, isDark),
          {
            position: "absolute",
            left: pad,
            right: pad,
            top: resultsTop,
            height: barHeight,
            borderRadius: 14 * unit,
            backgroundColor: theme.cardWhite,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12 * unit,
            gap: 10 * unit,
            zIndex: 10,
          },
          resultsStyle,
        ]}
      >
        <AppImage
          source={icons3d[NEW_TAG.icon]}
          style={{ width: 28 * unit, height: 28 * unit }}
          contentFit="contain"
        />
        <Text
          maxFontSizeMultiplier={1}
          style={[styles.textLeft, textStyle, { flex: 1, fontFamily: "Nunito-Bold" }]}
        >
          {NEW_TAG.name}
        </Text>
        <View
          style={{
            width: plusSize,
            height: plusSize,
            borderRadius: plusSize / 2,
            backgroundColor: theme.greenAccent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomIcon name="add" filled color={theme.pureWhite} size={14 * unit} />
        </View>
      </Animated.View>

      <TapDot
        unit={unit}
        instant={instant}
        x={dotAtBar ? width * 0.42 : dotAtPlus ? plusX : width * 0.66}
        y={
          dotAtBar
            ? pad + barHeight / 2
            : dotAtPlus
              ? resultsTop + barHeight / 2
              : height * 0.8
        }
        visible={[0, 1, 2, 4, 5].includes(step)}
        pressing={step === 2 || step === 5}
      />
    </DemoStage>
  );
}
