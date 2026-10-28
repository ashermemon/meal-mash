import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@/components/universal/AppText";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { getTintedBoxShadow } from "@/utils/shadow";
import { difficultyShape } from "@/components/features/recipe/InfoTag";
import {
  DEMO_BASE_HEIGHT,
  DemoProps,
  DemoStage,
  TapDot,
  timing,
  useDemoLoop,
} from "./demoKit";

const MODES = [
  "Pantry Ingredients Only",
  "Select Specific Ingredients",
  "Any Ingredients",
];
const DIFFICULTIES = ["Easy", "Moderate", "Expert"];

export default function GenerateDemo({ width, height, active }: DemoProps) {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const unit = height / DEMO_BASE_HEIGHT;
  const step = useDemoLoop(
    [500, 550, 300, 450, 300, 550, 300, 550, 300, 1300, 400],
    active,
  );
  const instant = step === 0;

  const mode = step >= 4 ? 2 : step >= 2 ? 1 : 0;
  const expertOn = step < 6;
  const generating = step >= 8;

  const pad = 16 * unit;
  const sliderHeight = 44 * unit;
  const labelHeight = 26 * unit;
  const pillHeight = 34 * unit;
  const pillGap = 6 * unit;
  const pillWidth = (width - pad * 2 - pillGap * 2) / 3;
  const difficultyLabelTop = pad + sliderHeight + 20 * unit;
  const difficultyTop = difficultyLabelTop + labelHeight;
  const buttonHeight = 40 * unit;
  const buttonTop = height - pad - buttonHeight;

  const color = useSharedValue(0);
  const label = useSharedValue(1);
  const button = useSharedValue(1);

  useEffect(() => {
    color.value = timing(mode, instant, 300);
    if (!instant) {
      label.value = 0;
      label.value = withTiming(1, { duration: 250 });
    }
  }, [mode, instant]);

  useEffect(() => {
    button.value = withSpring(step === 8 ? 0.97 : 1, {
      damping: 20,
      stiffness: 260,
    });
  }, [step]);

  const sliderStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      color.value,
      [0, 1, 2],
      [theme.yellowBlock, theme.greenBlock, theme.blueBlock],
    ),
  }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: label.value,
    transform: [{ translateX: (1 - label.value) * 14 * unit }],
  }));
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: button.value }],
  }));

  const difficultyColor = (name: string) =>
    name === "Easy"
      ? theme.greenBlock
      : name === "Moderate"
        ? theme.blueBlock
        : theme.redBlock;

  const dot = (() => {
    if (step >= 1 && step <= 4)
      return { x: width - pad - 18 * unit, y: pad + sliderHeight / 2 };
    if (step === 5 || step === 6)
      return {
        x: pad + 2 * (pillWidth + pillGap) + pillWidth / 2,
        y: difficultyTop + pillHeight / 2,
      };
    if (step === 7 || step === 8)
      return { x: width * 0.62, y: buttonTop + buttonHeight / 2 };
    return { x: width * 0.5, y: height * 0.55 };
  })();

  return (
    <DemoStage width={width} height={height} visible={step !== 10}>
      <Animated.View
        style={[
          {
            position: "absolute",
            left: pad,
            right: pad,
            top: pad,
            height: sliderHeight,
            borderRadius: 999,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 6 * unit,
          },
          sliderStyle,
        ]}
      >
        <CustomIcon name="left-small" filled color="grey" size={26 * unit} />
        <Animated.View style={[{ flex: 1 }, labelStyle]}>
          <Text
            maxFontSizeMultiplier={1}
            numberOfLines={1}
            style={[
              styles.textCentered,
              { fontSize: 13 * unit, fontFamily: "Nunito-SemiBold" },
            ]}
          >
            {MODES[mode]}
          </Text>
        </Animated.View>
        <CustomIcon name="right-small" filled color="grey" size={26 * unit} />
      </Animated.View>

      <Text
        maxFontSizeMultiplier={1}
        style={[
          styles.textLeftSemiBold,
          {
            position: "absolute",
            left: pad,
            top: difficultyLabelTop,
            fontSize: 14 * unit,
            color: theme.placeholderText,
          },
        ]}
      >
        Difficulty
      </Text>
      <View
        style={{
          position: "absolute",
          left: pad,
          right: pad,
          top: difficultyTop,
          height: pillHeight,
          flexDirection: "row",
          gap: pillGap,
        }}
      >
        {DIFFICULTIES.map((name) => {
          const on = name !== "Expert" || expertOn;
          const pillColor = on ? difficultyColor(name) : theme.cardWhite;
          return (
            <View
              key={name}
              style={[
                getTintedBoxShadow(pillColor, isDark),
                {
                  flex: 1,
                  borderRadius: 999,
                  backgroundColor: pillColor,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5 * unit,
                },
              ]}
            >
              {difficultyShape(name, !on, true, theme)}
              <Text
                maxFontSizeMultiplier={1}
                style={[
                  styles.textCentered,
                  {
                    fontSize: 12.5 * unit,
                    fontFamily: on ? "Nunito-Bold" : "Nunito-SemiBold",
                    color: theme.basicText,
                  },
                ]}
              >
                {name}
              </Text>
            </View>
          );
        })}
      </View>

      <Animated.View
        style={[
          {
            position: "absolute",
            left: pad,
            right: pad,
            top: buttonTop,
            height: buttonHeight,
            borderRadius: 14 * unit,
            backgroundColor: theme.primary,
            alignItems: "center",
            justifyContent: "center",
          },
          buttonStyle,
        ]}
      >
        <Text
          maxFontSizeMultiplier={1}
          style={[
            styles.textCenterBold,
            { fontSize: 14 * unit, color: theme.pureWhite },
          ]}
        >
          {generating ? "Generating…" : "Generate Recipes →"}
        </Text>
      </Animated.View>

      <TapDot
        unit={unit}
        instant={instant}
        x={dot.x}
        y={dot.y}
        visible={step <= 8}
        pressing={step === 2 || step === 4 || step === 6 || step === 8}
      />
    </DemoStage>
  );
}
