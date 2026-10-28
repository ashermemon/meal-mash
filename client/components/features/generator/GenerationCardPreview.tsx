import { View, Pressable, LayoutChangeEvent } from "react-native";
import { Text } from "@/components/universal/AppText";
import AppImage from "@/components/universal/AppImage";
import React, { useEffect } from "react";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import { useStyles } from "@/styles/GlobalStyles";
import RecipeInfoTags from "../recipe/RecipeInfoTags";
import NutrientsContext from "@/contexts/NutrientsContext";
import { useTheme, useColorScheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import { useMealImages } from "@/contexts/MealImageContext";
import { getMealImageSource } from "@/utils/mealImageSource";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { moderateScale, scale } from "@/utils/responsive";

type Props = {
  title: string | undefined;
  description: string;
  difficulty: string;
  time: string;
  servings: number | null;
  steps: number;
  tags: string[];
  saveRecipe: () => void;
  skipRecipe: () => void;
  isLoading?: boolean;
  imageCategory: string;
  nutrients?: number[];
  makeRecipe: () => void;
};

const SKELETON_TRANSITION = {
  type: "timing",
  duration: 2000,
} as const;

export const GenerationCardPreview = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const makeRecipeShadow = useTintedBoxShadow(theme.primary);
  const skipShadow = useTintedBoxShadow(theme.redBlock);
  const saveShadow = useTintedBoxShadow(theme.greenBlock);
  const { mealImages } = useMealImages();
  const imageSource = React.useMemo(
    () => getMealImageSource(mealImages, props.imageCategory),
    [mealImages, props.imageCategory],
  );

  const SkeletonSettings = {
    colorMode: colorScheme === "dark" ? "dark" : "light",
    transition: SKELETON_TRANSITION,
  } as const;

  const [imageArea, setImageArea] = React.useState({ width: 0, height: 0 });
  const imageBottomGap = moderateScale(16);
  const imageSize = Math.min(
    imageArea.width * 0.65,
    imageArea.height - imageBottomGap,
    scale(230),
  );
  const nutrientBoxHeight =
    Math.min(scale(136), (imageArea.width - moderateScale(16)) * 0.45) +
    moderateScale(20);

  const onImageAreaLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setImageArea((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height },
    );
  };

  const cardStyle = {
    width: "100%",
    alignSelf: "center",
    flex: 1,
    paddingHorizontal: moderateScale(4),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(28),
    backgroundColor: theme.nestedBG,
    borderRadius: moderateScale(5),
    overflow: "hidden",
  } as const;

  const middleStyle = {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: moderateScale(10),
  } as const;

  const imageAreaStyle = {
    flex: 1,
    minHeight: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: imageBottomGap,
  } as const;

  // useEffect(() => {

  //   router.prefetch("/followRecipe");
  // }, [])

  if (props.isLoading) {
    return (
      <Animated.View
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(300)}
        style={cardStyle}
      >
        <Skeleton.Group show={true}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: moderateScale(6),
            }}
          >
            <View
              style={{
                width: "100%",
                height: moderateScale(32),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Skeleton
                width="62%"
                height={moderateScale(24)}
                radius={moderateScale(8)}
                {...SkeletonSettings}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: moderateScale(8),
                justifyContent: "center",
                marginTop: moderateScale(13),
              }}
            >
              {[72, 78, 70].map((w) => (
                <Skeleton
                  key={w}
                  width={moderateScale(w)}
                  height={moderateScale(28)}
                  radius={moderateScale(10)}
                  {...SkeletonSettings}
                />
              ))}
            </View>
          </View>

          <View style={middleStyle}>
            <View style={imageAreaStyle} onLayout={onImageAreaLayout}>
              {imageSize > 0 ? (
                <Skeleton
                  width={imageSize}
                  height={imageSize}
                  radius="round"
                  {...SkeletonSettings}
                />
              ) : null}
            </View>

            {/* Description Skeleton */}
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: moderateScale(14),
              }}
            >
              {["92%", "86%", "58%"].map((w) => (
                <View
                  key={w}
                  style={{
                    width: "100%",
                    height: moderateScale(20),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Skeleton
                    width={w as `${number}%`}
                    height={moderateScale(13)}
                    radius={moderateScale(4)}
                    {...SkeletonSettings}
                  />
                </View>
              ))}
            </View>

            <View style={{ width: "100%" }}>
              <Skeleton
                width={"100%"}
                height={nutrientBoxHeight}
                radius={moderateScale(15)}
                {...SkeletonSettings}
              />
            </View>

            {/* Buttons (Disabled/Greyed out) */}
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: moderateScale(10),
                opacity: 0.4,
              }}
            >
              <Pressable
                style={[
                  makeRecipeShadow,
                  {
                    backgroundColor: theme.primary,
                    paddingVertical: moderateScale(14),
                    borderRadius: moderateScale(15),
                    width: "100%",
                  },
                ]}
                disabled={true}
              >
                <Text
                  style={[
                    styles.textCenterBold,
                    { color: theme.pureWhite, fontSize: moderateScale(18) },
                  ]}
                >
                  Make Recipe
                </Text>
              </Pressable>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  gap: "4%",
                  marginTop: moderateScale(10),
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={[
                    skipShadow,
                    {
                      backgroundColor: theme.redBlock,
                      paddingVertical: moderateScale(14),
                      borderRadius: moderateScale(15),
                      width: "48%",
                    },
                  ]}
                  disabled={true}
                >
                  <Text
                    style={[
                      styles.textCenterBold,
                      { fontSize: moderateScale(17), color: theme.pureWhite },
                    ]}
                  >
                    ← Skip
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    saveShadow,
                    {
                      backgroundColor: theme.greenBlock,
                      paddingVertical: moderateScale(14),
                      borderRadius: moderateScale(15),
                      width: "48%",
                    },
                  ]}
                  disabled={true}
                >
                  <Text
                    style={[
                      styles.textCenterBold,
                      { fontSize: moderateScale(17), color: theme.pureWhite },
                    ]}
                  >
                    Save →
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Skeleton.Group>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
      style={cardStyle}
    >
      <View style={{ width: "100%", alignItems: "center", marginBottom: moderateScale(6) }}>
        <Text
          style={[
            styles.textCentered,
            {
              fontFamily: "Nunito-Bold",
              fontSize: moderateScale(28),
              lineHeight: moderateScale(32),
            },
          ]}
          numberOfLines={2}
        >
          {props.title}
        </Text>

        <RecipeInfoTags
          difficulty={props.difficulty}
          time={props.time}
          tags={props.tags}
          justifyContent="center"
        />
      </View>

      <View style={middleStyle}>
        <View style={imageAreaStyle} onLayout={onImageAreaLayout}>
          {imageSize > 0 ? (
            <AppImage
              source={imageSource}
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: moderateScale(12),
              }}
              contentFit="cover"
            />
          ) : null}
        </View>

        <Text
          numberOfLines={3}
          style={[
            styles.textCentered,
            {
              fontFamily: "Nunito",
              fontSize: moderateScale(15),
              lineHeight: moderateScale(20),
              marginBottom: moderateScale(14),
            },
          ]}
        >
          {props.description}
        </Text>

        <NutrientsContext.Provider
          value={[props.nutrients || [0, 0, 0], () => {}]}
        >
          <NutrientCircle textInBox={false} />
        </NutrientsContext.Provider>

        <View style={{ width: "100%", alignItems: "center", marginTop: moderateScale(10) }}>
          <Pressable
            style={[
              makeRecipeShadow,
              {
                backgroundColor: theme.primary,
                paddingVertical: moderateScale(14),
                borderRadius: moderateScale(15),
                width: "100%",
              },
            ]}
            onPress={() => {
              Haptics.selectionAsync();
              props.makeRecipe();
            }}

            //more laggy: InteractionManager.runAfterInteractions(() => { router.navigate("/followRecipe") })
          >
            <Text
              style={[
                styles.textCenterBold,
                { color: theme.pureWhite, fontSize: moderateScale(18) },
              ]}
            >
              Make Recipe
            </Text>
          </Pressable>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: "4%",
              marginTop: moderateScale(10),
              justifyContent: "center",
            }}
          >
            <Pressable
              style={[
                skipShadow,
                {
                  backgroundColor: theme.redBlock,
                  paddingVertical: moderateScale(14),
                  borderRadius: moderateScale(15),
                  width: "48%",
                },
              ]}
              onPress={() => {
                props.skipRecipe();
              }}
            >
              <Text style={[styles.textCenterBold, { fontSize: moderateScale(17) }]}>
                ← Skip
              </Text>
            </Pressable>

            <Pressable
              style={[
                saveShadow,
                {
                  backgroundColor: theme.greenBlock,
                  paddingVertical: moderateScale(14),
                  borderRadius: moderateScale(15),
                  width: "48%",
                },
              ]}
              onPress={() => {
                props.saveRecipe();
              }}
            >
              <Text style={[styles.textCenterBold, { fontSize: moderateScale(17) }]}>
                Save →
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default GenerationCardPreview;
