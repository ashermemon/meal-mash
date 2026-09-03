import {
  Button,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStyles } from "@/styles/GlobalStyles";
import AppImage from "@/components/universal/AppImage";
import { useFocusEffect, useRouter } from "expo-router";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { CustomIcon } from "@/icon-loader/icon-loader";
import icons3d from "@/components/universal/3dIcons";
import FeaturedRecipes from "@/components/features/home/CategoryScrolls";
import ExploreSection from "@/components/features/home/ExploreSection";
import Camera from "@/components/universal/Camera";
import { useCameraPermissions } from "expo-camera";
import { BackHandler } from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";
import RecipeContext, { initialRecipeData } from "@/contexts/RecipeContext";

const IRIDESCENT_COLORS_LIGHT = [
  "#FDF3F8",
  "#F6F2FC",
  "#F1F6FC",
  "#F0FAF5",
  "#FAFCF0",
  "#FDF3F8",
] as const;

const IRIDESCENT_COLORS_DARK = [
  "#2B2530",
  "#232A3C",
  "#1E2A32",
  "#1C2A22",
  "#2A2A1C",
  "#2B2530",
] as const;

const FEEDBACK_FORM_URL = "https://forms.gle/Uxzrkfzvk7tFAFRW9";

const SHEEN_BAND_WIDTH = 60;
const SHEEN_MARGIN = 60;

const IridescentBackground = () => {
  const isDark = useIsDarkMode();
  const drift = useSharedValue(0);
  const sheenProgress = useSharedValue(0);
  const [barWidth, setBarWidth] = useState(340);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
    sheenProgress.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 1400,
          easing: Easing.out(Easing.quad),
        }),
        withDelay(2200, withTiming(0, { duration: 0 })),
      ),
      -1,
    );
  }, []);

  const baseStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -70 + drift.value * 140 },
      { translateY: -45 + drift.value * 90 },
      { rotate: `${-3 + drift.value * 6}deg` },
    ],
  }));

  const sheenStyle = useAnimatedStyle(() => {
    const startX = -SHEEN_BAND_WIDTH - SHEEN_MARGIN;
    const endX = barWidth + SHEEN_MARGIN;
    return {
      transform: [
        { translateX: startX + sheenProgress.value * (endX - startX) },
        { rotate: "18deg" },
      ],
    };
  });

  return (
    <View
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
      onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: -70,
            bottom: -70,
            left: -100,
            right: -100,
          },
          baseStyle,
        ]}
      >
        <LinearGradient
          colors={isDark ? IRIDESCENT_COLORS_DARK : IRIDESCENT_COLORS_LIGHT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: -60,
            bottom: -60,
            width: SHEEN_BAND_WIDTH,
          },
          sheenStyle,
        ]}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
            "rgba(255,255,255,0)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const FeedbackBanner = () => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        Linking.openURL(FEEDBACK_FORM_URL);
      }}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        paddingVertical: 6,
        paddingHorizontal: 11,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: theme.secondaryBoxGrey,
        borderWidth: 1,
        borderColor: theme.dividerGrey2,
      })}
    >
      <Text
        style={[
          styles.basicTextLeft,
          {
            flex: 1,
            fontSize: 11.5,
            color: theme.placeholderText,
          },
        ]}
      >
        MealMash is in beta! Please leave feedback!
      </Text>
      <CustomIcon
        name="arrow-right-up"
        size={13}
        color={theme.placeholderText}
      />
    </Pressable>
  );
};

export default function Welcome() {
  const styles = useStyles();
  const theme = useTheme();
  const recipeBarShadow = useTintedBoxShadow(theme.secondaryBoxGrey);
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [recipeData, setRecipeData] = useContext(RecipeContext);
  const [generationDetails, setGenerationDetails] = useContext(
    GenerationDetailsContext,
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (showCamera) {
          setShowCamera(false);
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, [showCamera]),
  );
  return showCamera ? (
    <View style={{ width: "100%", flex: 1 }}>
      <Camera></Camera>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        width: "100%",
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 85,
      }}
    >
      <View style={{ width: "100%", flex: 1 }}>
        <FeedbackBanner />
        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            {
              fontSize: 28,
              marginBottom: 5,
            },
          ]}
        >
          Welcome to MealMash!
        </Text>
        <View style={[styles.recipeBar, recipeBarShadow]}>
          <IridescentBackground />
          {/*  <Pressable
            style={[
              styles.circleButton,
              {
                height: 38,
                width: 38,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => [
              permission
                ? !permission.granted
                  ? [requestPermission(), setShowCamera(true)]
                  : setShowCamera(true)
                : [requestPermission(), setShowCamera(true)],
            ]}
          >
            <CustomIcon name="camera" filled={true} color={theme.pureWhite} />
          </Pressable>*/}
          <Pressable
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              paddingHorizontal: 13,
            }}
            onPress={() => [
              setGenerationDetails((prev) => ({
                ...prev,
                generationType: 2,
                difficulties: ["Easy", "Moderate", "Expert"],
                recipeTime: ["<15m", "~30m", "1hr+"],
                numberOfServings: 1,
                mealType: ["Any"],
                cuisine: ["Any"],
                dietaryPreference: ["None"],
                portalCategory: undefined,
              })),
              router.navigate("/recipe"),
              setRecipeData(initialRecipeData),
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppImage
                source={icons3d.Gift}
                style={{
                  width: 37,
                  height: 37,

                  marginRight: 17,
                }}
                contentFit="contain"
              />
              <View>
                <Text
                  style={[
                    styles.basicTextLeft,
                    styles.bold,
                    {
                      fontSize: 16,
                      color: theme.basicText,
                    },
                  ]}
                >
                  Surprise Me!
                </Text>
                <Text
                  style={[
                    styles.basicTextLeft,

                    {
                      fontSize: 11,
                      color: theme.basicText,
                      opacity: 0.75,
                    },
                  ]}
                >
                  Generate a random recipe (any ingredients)
                </Text>
              </View>
            </View>
            <CustomIcon
              name={"arrow-right"}
              size={23}
              color={theme.basicText}
            ></CustomIcon>
          </Pressable>
        </View>

        <FeaturedRecipes></FeaturedRecipes>

        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            {
              fontSize: 28,
              marginBottom: 10,
            },
          ]}
        >
          Explore
        </Text>

        <ExploreSection></ExploreSection>
      </View>
    </View>
  );
}
//<CustomIcon name="heart" filled={true} color="red" size={24} />
