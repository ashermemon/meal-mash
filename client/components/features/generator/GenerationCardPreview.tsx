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
  const imageSize = Math.min(
    imageArea.width * 0.75,
    imageArea.height,
    scale(260),
  );
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
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(8),
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
    paddingHorizontal: moderateScale(10),
  } as const;

  const imageAreaStyle = {
    flex: 1,
    minHeight: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
              gap: moderateScale(10),
            }}
          >
            {/* Title Skeleton */}
            <Skeleton
              width={scale(200)}
              height={scale(32)}
              radius={scale(8)}
              {...SkeletonSettings}
            />

            {/* Recipe Info Tags Skeleton */}
            <View
              style={{ flexDirection: "row", gap: moderateScale(8), justifyContent: "center" }}
            >
              <Skeleton
                width={scale(60)}
                height={scale(24)}
                radius={scale(12)}
                {...SkeletonSettings}
              />
              <Skeleton
                width={scale(60)}
                height={scale(24)}
                radius={scale(12)}
                {...SkeletonSettings}
              />
              <Skeleton
                width={scale(60)}
                height={scale(24)}
                radius={scale(12)}
                {...SkeletonSettings}
              />
            </View>
          </View>

          <View style={middleStyle}>
            <View style={imageAreaStyle} onLayout={onImageAreaLayout}>
              {imageSize > 0 ? (
                <Skeleton
                  width={imageSize * 0.95}
                  height={imageSize * 0.95}
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
                gap: moderateScale(6),
              }}
            >
              <Skeleton
                width="90%"
                height={scale(16)}
                radius={scale(4)}
                {...SkeletonSettings}
              />
              <Skeleton
                width="70%"
                height={scale(16)}
                radius={scale(4)}
                {...SkeletonSettings}
              />
            </View>

            {/* NutrientCircle Skeleton */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Skeleton
                width={"100%"}
                height={scale(145)}
                radius={scale(15)}
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
