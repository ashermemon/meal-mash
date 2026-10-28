import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@/components/universal/AppText";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import { CustomIcon } from "@/icon-loader/icon-loader";
import {
  DEMO_BASE_HEIGHT,
  DemoProps,
  DemoStage,
  TapDot,
  useDemoLoop,
} from "./demoKit";

const ITEMS = [
  { name: "Milk", icon: "Milk" },
  { name: "Yogurt", icon: "Yogurt" },
  { name: "Bread", icon: "Bread" },
];

export default function GroceryDemo({ width, height, active }: DemoProps) {
  const styles = useStyles();
  const theme = useTheme();
  const unit = height / DEMO_BASE_HEIGHT;
  const step = useDemoLoop([550, 500, 350, 650, 450, 350, 650, 1200, 400], active);
  const instant = step === 0;

  const items =
    step >= 7 ? ITEMS.slice(2) : step >= 4 ? ITEMS.slice(1) : ITEMS;
  const checkedName =
    step === 2 || step === 3 ? "Milk" : step === 5 || step === 6 ? "Yogurt" : null;
  const flyingName = step === 3 ? "Milk" : step === 6 ? "Yogurt" : null;
  const count = step >= 7 ? 6 : step >= 4 ? 5 : 4;

  const pad = 14 * unit;
  const headerHeight = 22 * unit;
  const rowHeight = 34 * unit;
  const rowGap = 7 * unit;
  const rowsTop = pad + headerHeight;
  const chipHeight = 34 * unit;
  const chipTop = height - pad - chipHeight;
  const checkboxX = pad + 12 * unit + 10 * unit;

  const bump = useSharedValue(1);
  useEffect(() => {
    if (instant) return;
    bump.value = withSequence(
      withTiming(1.15, { duration: 140 }),
      withSpring(1, { damping: 18, stiffness: 220 }),
    );
  }, [count]);
  const bumpStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bump.value }],
  }));

  const badgeSize = 20 * unit;

  return (
    <DemoStage width={width} height={height} visible={step !== 8}>
      <Text
        maxFontSizeMultiplier={1}
        style={[
          styles.textLeftBold,
          {
            position: "absolute",
            left: pad,
            top: pad - 2 * unit,
            fontSize: 13 * unit,
          },
        ]}
      >
        Grocery List
      </Text>

      <View
        style={{
          position: "absolute",
          left: pad,
          right: pad,
          top: rowsTop,
          gap: rowGap,
        }}
      >
        {items.map((item, index) => (
          <GroceryRow
            key={item.name}
            item={item}
            checked={checkedName === item.name}
            flying={flyingName === item.name}
            instant={instant}
            unit={unit}
            height={rowHeight}
            flyY={chipTop + chipHeight / 2 - (rowsTop + index * (rowHeight + rowGap) + rowHeight / 2)}
          />
        ))}
      </View>

      <View
        style={{
          position: "absolute",
          top: chipTop,
          alignSelf: "center",
          height: chipHeight,
          borderRadius: 999,
          backgroundColor: theme.cardWhite,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10 * unit,
          paddingRight: 7 * unit,
          gap: 7 * unit,
        }}
      >
        <View style={{ marginRight: -3 * unit }}>
          <CustomIcon
            name="fridge"
            filled
            color={theme.basicText}
            size={16 * unit}
          />
        </View>
        <Text
          maxFontSizeMultiplier={1}
          style={[styles.textLeftBold, { fontSize: 13 * unit }]}
        >
          Pantry
        </Text>
        <Animated.View
          style={[
            {
              minWidth: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              paddingHorizontal: 5 * unit,
              backgroundColor: theme.greenAccent,
              alignItems: "center",
              justifyContent: "center",
            },
            bumpStyle,
          ]}
        >
          <Text
            maxFontSizeMultiplier={1}
            style={[
              styles.textCenterBold,
              { fontSize: 11 * unit, color: theme.pureWhite },
            ]}
          >
            {count}
          </Text>
        </Animated.View>
      </View>

      <TapDot
        unit={unit}
        instant={instant}
        x={[1, 2, 4, 5].includes(step) ? checkboxX : width * 0.72}
        y={[1, 2, 4, 5].includes(step) ? rowsTop + rowHeight / 2 : height * 0.62}
        visible={[0, 1, 2, 4, 5].includes(step)}
        pressing={step === 2 || step === 5}
      />
    </DemoStage>
  );
}

function GroceryRow({
  item,
  checked,
  flying,
  instant,
  unit,
  height,
  flyY,
}: {
  item: (typeof ITEMS)[number];
  checked: boolean;
  flying: boolean;
  instant: boolean;
  unit: number;
  height: number;
  flyY: number;
}) {
  const styles = useStyles();
  const theme = useTheme();
  const fly = useSharedValue(0);

  useEffect(() => {
    fly.value = instant
      ? 0
      : withTiming(flying ? 1 : 0, {
          duration: flying ? 600 : 0,
          easing: Easing.inOut(Easing.cubic),
        });
  }, [flying, instant]);

  const flyStyle = useAnimatedStyle(() => ({
    opacity: interpolate(fly.value, [0, 0.75, 1], [1, 0.9, 0]),
    transform: [
      { translateY: fly.value * flyY },
      { scale: interpolate(fly.value, [0, 1], [1, 0.3]) },
    ],
  }));

  return (
    <Animated.View
      layout={instant ? undefined : LinearTransition.duration(320)}
      style={[
        {
          height,
          borderRadius: 11 * unit,
          backgroundColor: theme.cardWhite,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12 * unit,
          gap: 10 * unit,
          zIndex: flying ? 5 : 0,
        },
        flyStyle,
      ]}
    >
      <CustomCheckbox checked={checked} size={20 * unit} borderRadius={6 * unit} />
      <AppImage
        source={icons3d[item.icon]}
        style={{ width: 22 * unit, height: 22 * unit }}
        contentFit="contain"
      />
      <Text
        maxFontSizeMultiplier={1}
        style={[
          styles.textLeft,
          {
            fontSize: 13.5 * unit,
            fontFamily: "Nunito-SemiBold",
            color: checked ? theme.placeholderText : theme.basicText,
            textDecorationLine: checked ? "line-through" : "none",
          },
        ]}
      >
        {item.name}
      </Text>
    </Animated.View>
  );
}
