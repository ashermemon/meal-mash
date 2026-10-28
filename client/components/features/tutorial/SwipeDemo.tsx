import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@/components/universal/AppText";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import { difficultyShape } from "@/components/features/recipe/InfoTag";
import {
  DEMO_BASE_HEIGHT,
  DemoProps,
  DemoStage,
  TapDot,
  useDemoCycle,
} from "./demoKit";

const CARDS = [
  { title: "Salad Bowl", icon: "Salad", difficulty: "Easy", time: "15 mins" },
  { title: "Fish Tacos", icon: "Taco", difficulty: "Moderate", time: "30 mins" },
  { title: "Pancakes", icon: "Pancake", difficulty: "Easy", time: "20 mins" },
];

const DRAG = 0.32;
const DRAG_DURATION = 700;

export default function SwipeDemo({ width, height, active }: DemoProps) {
  const unit = height / DEMO_BASE_HEIGHT;
  const { step, loop } = useDemoCycle(
    [550, 250, DRAG_DURATION + 50, 400, 500, 250, DRAG_DURATION + 50, 400, 900],
    active,
  );

  const roleStates = [
    {
      x: step === 2 ? DRAG : step >= 3 ? 1.25 : 0,
      depth: 0,
      badge: step >= 2 ? ("save" as const) : null,
    },
    {
      x: step === 6 ? -DRAG : step >= 7 ? -1.25 : 0,
      depth: step >= 3 ? 0 : 1,
      badge: step >= 6 ? ("skip" as const) : null,
    },
    { x: 0, depth: step >= 7 ? 0 : step >= 3 ? 1 : 2, badge: null },
  ];
  const offset = (loop * 2) % CARDS.length;
  const roleOf = (cardIndex: number) =>
    (cardIndex - offset + CARDS.length) % CARDS.length;
  const drawOrder = CARDS.map((_, i) => i).sort(
    (a, b) => roleOf(b) - roleOf(a),
  );

  const centerX = width / 2;
  const centerY = height / 2;
  const dot = (() => {
    if (step === 2 || step === 3) return { x: centerX + width * DRAG, y: centerY };
    if (step === 6 || step === 7) return { x: centerX - width * DRAG, y: centerY };
    return { x: centerX, y: centerY };
  })();

  return (
    <DemoStage width={width} height={height} visible>
      {drawOrder.map((i) => (
        <SwipeCard
          key={CARDS[i].title}
          card={CARDS[i]}
          state={roleStates[roleOf(i)]}
          stageWidth={width}
          stageHeight={height}
          unit={unit}
        />
      ))}
      <TapDot
        unit={unit}
        instant={false}
        x={dot.x}
        y={dot.y}
        moveDuration={DRAG_DURATION}
        visible={[0, 1, 2, 4, 5, 6].includes(step)}
        pressing={step === 1 || step === 5}
      />
    </DemoStage>
  );
}

function SwipeCard({
  card,
  state,
  stageWidth,
  stageHeight,
  unit,
}: {
  card: (typeof CARDS)[number];
  state: { x: number; depth: number; badge: "save" | "skip" | null };
  stageWidth: number;
  stageHeight: number;
  unit: number;
}) {
  const styles = useStyles();
  const theme = useTheme();
  const x = useSharedValue(state.x * stageWidth);
  const depth = useSharedValue(state.depth);
  const badge = useSharedValue(0);

  useEffect(() => {
    const target = state.x * stageWidth;
    const rejoiningDeck =
      Math.abs(x.value) > stageWidth && Math.abs(state.x) <= 1;

    if (rejoiningDeck) {
      x.value = target;
      depth.value = 2;
      badge.value = 0;
    } else if (Math.abs(state.x) > 1) {
      x.value = withTiming(target, {
        duration: 380,
        easing: Easing.in(Easing.cubic),
      });
    } else {
      x.value = withTiming(target, {
        duration: DRAG_DURATION,
        easing: Easing.inOut(Easing.cubic),
      });
    }

    depth.value = withSpring(state.depth, { damping: 24, stiffness: 160 });
    badge.value = withTiming(state.badge ? 1 : 0, { duration: 300 });
  }, [state.x, state.depth, state.badge]);

  const cardWidth = stageWidth * 0.5;
  const cardHeight = stageHeight * 0.76;
  const cardTop = (stageHeight - cardHeight) / 2 - 4 * unit;

  const cardStyle = useAnimatedStyle(() => ({
    opacity: interpolate(depth.value, [0, 1, 2], [1, 1, 0]),
    transform: [
      { translateX: x.value },
      { translateY: depth.value * 9 * unit },
      { scale: 1 - depth.value * 0.06 },
      { rotate: `${(x.value / stageWidth) * 12}deg` },
    ],
  }));

  const isSave = state.badge === "save";
  const badgeRotation = isSave ? -8 : 8;

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badge.value,
    transform: [
      { rotate: `${badgeRotation}deg` },
      { scale: interpolate(badge.value, [0, 1], [0.9, 1]) },
    ],
  }));
  const pillText = [
    styles.textCentered,
    { fontSize: 10 * unit, fontFamily: "Nunito-SemiBold" },
  ];

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: (stageWidth - cardWidth) / 2,
          top: cardTop,
          width: cardWidth,
          height: cardHeight,
          borderRadius: 18 * unit,
          backgroundColor: theme.cardWhite,
          alignItems: "center",
          justifyContent: "center",
          gap: 6 * unit,
          elevation: 3,
          shadowColor: theme.basicText,
          shadowOpacity: 0.12,
          shadowRadius: 10 * unit,
          shadowOffset: { width: 0, height: 4 * unit },
        },
        cardStyle,
      ]}
    >
      <AppImage
        source={icons3d[card.icon]}
        style={{ width: cardHeight * 0.42, height: cardHeight * 0.42 }}
        contentFit="contain"
      />
      <Text
        maxFontSizeMultiplier={1}
        numberOfLines={1}
        style={[styles.textCenterBold, { fontSize: 14 * unit }]}
      >
        {card.title}
      </Text>
      <View style={{ flexDirection: "row", gap: 5 * unit }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4 * unit,
            backgroundColor:
              card.difficulty === "Easy" ? theme.greenBlock : theme.blueBlock,
            borderRadius: 999,
            paddingHorizontal: 7 * unit,
            paddingVertical: 3 * unit,
          }}
        >
          {difficultyShape(card.difficulty.toLowerCase(), false, true, theme)}
          <Text maxFontSizeMultiplier={1} style={pillText}>
            {card.difficulty}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.orangeBlock,
            borderRadius: 999,
            paddingHorizontal: 7 * unit,
            paddingVertical: 3 * unit,
          }}
        >
          <Text maxFontSizeMultiplier={1} style={pillText}>
            {card.time}
          </Text>
        </View>
      </View>

      <Animated.View
        style={[
          {
            position: "absolute",
            top: 12 * unit,
            [isSave ? "left" : "right"]: 12 * unit,
            borderRadius: 8 * unit,
            borderWidth: 2 * unit,
            borderColor: isSave ? theme.greenAccent : theme.redAccent,
            backgroundColor: isSave ? theme.greenBlock : theme.redBlock,
            paddingHorizontal: 8 * unit,
            paddingVertical: 2 * unit,
          },
          badgeStyle,
        ]}
      >
        <Text
          maxFontSizeMultiplier={1}
          style={[
            styles.textCenterBold,
            {
              fontSize: 11 * unit,
              color: isSave ? theme.greenAccent : theme.redAccent,
            },
          ]}
        >
          {isSave ? "Saved" : "Skip"}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
