import {
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Text } from "@/components/universal/AppText";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import * as Haptics from "expo-haptics";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import { setTutorialSeen } from "@/utils/storage";
import { moderateScale, scale } from "@/utils/responsive";

const slides = [
  {
    icon: "Burrito",
    title: "Welcome to MealMash!",
    body: "Turn whatever's in your kitchen into your next meal, so less food goes to waste.",
  },
  {
    icon: "Peach",
    title: "Stock your pantry",
    body: "Add the ingredients you have at home. Feel free to plug in your leftovers and we'll make something tasty!",
  },
  {
    icon: "Fire",
    title: "Generate recipes",
    body: "Cook with your whole pantry, pick specific ingredients, or use anything. Set the difficulty, time, cuisine and more.",
  },
  {
    icon: "Pasta",
    title: "Swipe to choose",
    body: "Swipe right to save a recipe and left to skip it. Tap Make Recipe to cook it step by step with built-in timers.",
  },
  {
    icon: "RecipeBook",
    title: "Save and shop",
    body: "Find your saved recipes anytime. Items you check off your grocery list go straight into your pantry.",
  },
];

export default function Tutorial() {
  const styles = useStyles();
  const theme = useTheme();
  const buttonShadow = useTintedBoxShadow(theme.primary);
  const iconShadow = useTintedBoxShadow(theme.greyBlock);
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const isLast = index === slides.length - 1;
  const iconCircleSize = Math.min(scale(200), height * 0.28);

  const goTo = (next: number) => {
    scrollRef.current?.scrollTo({ x: next * width, animated: true });
    setIndex(next);
  };

  const finish = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTutorialSeen();
    router.replace("/(tabs)");
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Stack.Screen options={{ gestureEnabled: false }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: moderateScale(25),
          paddingTop: moderateScale(8),
          minHeight: moderateScale(32),
        }}
      >
        {!isLast ? (
          <Pressable hitSlop={moderateScale(12)} onPress={finish}>
            <Text
              style={[
                styles.textLeftSemiBold,
                { fontSize: moderateScale(15), color: theme.placeholderText },
              ]}
            >
              Skip
            </Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        onMomentumScrollEnd={onScrollEnd}
        style={{ flex: 1 }}
      >
        {slides.map((slide) => (
          <View
            key={slide.title}
            style={{
              width,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: moderateScale(35),
              gap: moderateScale(14),
            }}
          >
            <View
              style={[
                iconShadow,
                {
                  width: iconCircleSize,
                  height: iconCircleSize,
                  borderRadius: iconCircleSize / 2,
                  backgroundColor: theme.greyBlock,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: moderateScale(16),
                },
              ]}
            >
              <AppImage
                source={icons3d[slide.icon] || icons3d.Default}
                style={{
                  width: iconCircleSize * 0.6,
                  height: iconCircleSize * 0.6,
                }}
                contentFit="contain"
              />
            </View>
            <Text
              style={[
                styles.textCenterBold,
                { fontSize: moderateScale(26), color: theme.basicText },
              ]}
            >
              {slide.title}
            </Text>
            <Text
              style={[
                styles.textCentered,
                {
                  fontSize: moderateScale(16),
                  lineHeight: moderateScale(23),
                  color: theme.placeholderText,
                },
              ]}
            >
              {slide.body}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: moderateScale(25),
          paddingBottom: moderateScale(20),
          gap: moderateScale(22),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: moderateScale(8),
          }}
        >
          {slides.map((slide, i) => (
            <View
              key={slide.title}
              style={{
                height: moderateScale(8),
                width: i === index ? moderateScale(22) : moderateScale(8),
                borderRadius: 999,
                backgroundColor:
                  i === index ? theme.primary : theme.unselectedShape,
              }}
            />
          ))}
        </View>

        <Pressable
          onPress={() => {
            if (isLast) {
              finish();
            } else {
              Haptics.selectionAsync();
              goTo(index + 1);
            }
          }}
          style={[
            buttonShadow,
            {
              backgroundColor: theme.primary,
              paddingVertical: moderateScale(14),
              borderRadius: moderateScale(15),
              width: "100%",
            },
          ]}
        >
          <Text
            style={[
              styles.textCenterBold,
              { color: theme.pureWhite, fontSize: moderateScale(18) },
            ]}
          >
            {isLast ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
