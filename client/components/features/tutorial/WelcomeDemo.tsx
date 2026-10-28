import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Text } from "@/components/universal/AppText";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { CustomIcon } from "@/icon-loader/icon-loader";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import { difficultyShape } from "@/components/features/recipe/InfoTag";
import { getTintedBoxShadow } from "@/utils/shadow";
import {
  DEMO_BASE_HEIGHT,
  DemoProps,
  DemoStage,
  timing,
  useDemoLoop,
} from "./demoKit";

const INGREDIENTS = [
  { name: "Rice", icon: "Rice", leftover: true },
  { name: "Eggs", icon: "Eggs", leftover: false },
  { name: "Carrots", icon: "Carrot", leftover: false },
];

export default function WelcomeDemo({ width, height, active }: DemoProps) {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const unit = height / DEMO_BASE_HEIGHT;
  const step = useDemoLoop([800, 380, 380, 380, 450, 2400, 400], active);
  const instant = step === 0;

  const arrow = useSharedValue(0);
  const card = useSharedValue(0);

  useEffect(() => {
    arrow.value = timing(step >= 4 && step <= 5 ? 1 : 0, instant, 250);
    card.value = timing(step === 5 ? 1 : 0, instant, 450);
  }, [step]);

  const pad = 16 * unit;
  const rowHeight = 40 * unit;
  const rowGap = 8 * unit;
  const columnWidth = width * 0.42;
  const columnHeight = rowHeight * 3 + rowGap * 2;
  const columnTop = (height - columnHeight) / 2;
  const cardLeft = pad + columnWidth + 30 * unit;
  const cardWidth = width - pad - cardLeft;
  const cardHeight = 164 * unit;
  const cardTop = (height - cardHeight) / 2;

  const arrowStyle = useAnimatedStyle(() => ({
    opacity: arrow.value,
    transform: [{ translateX: (1 - arrow.value) * -4 * unit }],
  }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: card.value,
    transform: [{ translateX: interpolate(card.value, [0, 1], [14 * unit, 0]) }],
  }));

  const pillText = [
    styles.textCentered,
    { fontSize: 9.5 * unit, fontFamily: "Nunito-SemiBold" },
  ];

  return (
    <DemoStage width={width} height={height} visible={step !== 6}>
      <View
        style={{
          position: "absolute",
          left: pad,
          top: columnTop,
          width: columnWidth,
          gap: rowGap,
        }}
      >
        {INGREDIENTS.map((item, i) => (
          <IngredientRow
            key={item.name}
            item={item}
            checked={step >= i + 1 && step <= 5}
            instant={instant}
            height={rowHeight}
            unit={unit}
          />
        ))}
      </View>

      <Animated.View
        style={[
          {
            position: "absolute",
            left: pad + columnWidth + 6 * unit,
            top: height / 2 - 9 * unit,
          },
          arrowStyle,
        ]}
      >
        <CustomIcon
          name="right-small"
          filled
          color={theme.placeholderText}
          size={18 * unit}
        />
      </Animated.View>

      <Animated.View
        style={[
          getTintedBoxShadow(theme.cardWhite, isDark),
          {
            position: "absolute",
            left: cardLeft,
            top: cardTop,
            width: cardWidth,
            height: cardHeight,
            borderRadius: 16 * unit,
            backgroundColor: theme.cardWhite,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 8 * unit,
            gap: 6 * unit,
          },
          cardStyle,
        ]}
      >
        <AppImage
          source={icons3d.Rice}
          style={{ width: 62 * unit, height: 62 * unit }}
          contentFit="contain"
        />
        <Text
          maxFontSizeMultiplier={1}
          numberOfLines={2}
          style={[
            styles.textCenterBold,
            { fontSize: 13 * unit, lineHeight: 16 * unit },
          ]}
        >
          Veggie Fried Rice
        </Text>
        <View style={{ flexDirection: "row", gap: 4 * unit }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3 * unit,
              backgroundColor: theme.greenBlock,
              borderRadius: 999,
              paddingHorizontal: 6 * unit,
              paddingVertical: 2.5 * unit,
            }}
          >
            {difficultyShape("easy", false, true, theme)}
            <Text maxFontSizeMultiplier={1} style={pillText}>
              Easy
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.orangeBlock,
              borderRadius: 999,
              paddingHorizontal: 6 * unit,
              paddingVertical: 2.5 * unit,
            }}
          >
            <Text maxFontSizeMultiplier={1} style={pillText}>
              15 mins
            </Text>
          </View>
        </View>
      </Animated.View>
    </DemoStage>
  );
}

function IngredientRow({
  item,
  checked,
  instant,
  height,
  unit,
}: {
  item: (typeof INGREDIENTS)[number];
  checked: boolean;
  instant: boolean;
  height: number;
  unit: number;
}) {
  const styles = useStyles();
  const theme = useTheme();
  const check = useSharedValue(0);

  useEffect(() => {
    check.value = timing(checked ? 1 : 0, instant, 220);
  }, [checked, instant]);

  const checkStyle = useAnimatedStyle(() => ({
    opacity: check.value,
    transform: [{ scale: interpolate(check.value, [0, 1], [0.8, 1]) }],
  }));

  const circleSize = 18 * unit;

  return (
    <View
      style={{
        height,
        borderRadius: 12 * unit,
        backgroundColor: theme.cardWhite,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10 * unit,
        gap: 8 * unit,
      }}
    >
      <AppImage
        source={icons3d[item.icon]}
        style={{ width: 24 * unit, height: 24 * unit }}
        contentFit="contain"
      />
      <View style={{ flex: 1 }}>
        <Text
          maxFontSizeMultiplier={1}
          numberOfLines={1}
          style={[
            styles.textLeftSemiBold,
            { fontSize: 13 * unit, lineHeight: 16 * unit },
          ]}
        >
          {item.name}
        </Text>
        {item.leftover ? (
          <Text
            maxFontSizeMultiplier={1}
            style={[
              styles.textLeftSemiBold,
              {
                fontSize: 9.5 * unit,
                lineHeight: 12 * unit,
                color: theme.orangeAccent,
              },
            ]}
          >
            Leftover
          </Text>
        ) : null}
      </View>
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: 1.5 * unit,
          borderColor: theme.unselectedShape,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: theme.greenAccent,
              alignItems: "center",
              justifyContent: "center",
            },
            checkStyle,
          ]}
        >
          <CustomIcon
            name="check"
            filled
            color={theme.pureWhite}
            size={10 * unit}
          />
        </Animated.View>
      </View>
    </View>
  );
}
