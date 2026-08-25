import {
  View,
  Text,
  Pressable,
  Dimensions,
  InteractionManager,
} from "react-native";
import { Image } from "expo-image";
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

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_HORIZONTAL_MARGIN = 13;
const CARD_WIDTH = SCREEN_WIDTH - CARD_HORIZONTAL_MARGIN * 2;
const IMAGE_SIZE = Math.min(260, Math.max(190, CARD_WIDTH * 0.7));

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

  // useEffect(() => {

  //   router.prefetch("/followRecipe");
  // }, [])

  if (props.isLoading) {
    return (
      <Animated.View
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(300)}
        style={{
          width: CARD_WIDTH,
          alignSelf: "center",
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 8,
          backgroundColor: theme.nestedBG,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Skeleton.Group show={true}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 6,
              gap: 10,
            }}
          >
            {/* Title Skeleton */}
            <Skeleton
              width={200}
              height={32}
              radius={8}
              {...SkeletonSettings}
            />

            {/* Recipe Info Tags Skeleton */}
            <View
              style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}
            >
              <Skeleton
                width={60}
                height={24}
                radius={12}
                {...SkeletonSettings}
              />
              <Skeleton
                width={60}
                height={24}
                radius={12}
                {...SkeletonSettings}
              />
              <Skeleton
                width={60}
                height={24}
                radius={12}
                {...SkeletonSettings}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            {/* Image Skeleton */}
            <Skeleton
              width={IMAGE_SIZE * 0.95}
              height={IMAGE_SIZE * 0.95}
              radius="round"
              {...SkeletonSettings}
            />

            {/* Description Skeleton */}
            <View
              style={{
                width: "100%",
                alignItems: "center",
                gap: 6,
                marginVertical: 10,
              }}
            >
              <Skeleton
                width="90%"
                height={16}
                radius={4}
                {...SkeletonSettings}
              />
              <Skeleton
                width="70%"
                height={16}
                radius={4}
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
                height={145}
                radius={15}
                {...SkeletonSettings}
              />
            </View>

            {/* Buttons (Disabled/Greyed out) */}
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 10,
                opacity: 0.4,
              }}
            >
              <Pressable
                style={[
                  makeRecipeShadow,
                  {
                    backgroundColor: theme.primary,
                    paddingVertical: 14,
                    borderRadius: 15,
                    width: "100%",
                  },
                ]}
                disabled={true}
              >
                <Text
                  style={[
                    styles.textCenterBold,
                    { color: theme.pureWhite, fontSize: 18 },
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
                  marginTop: 10,
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={[
                    skipShadow,
                    {
                      backgroundColor: theme.redBlock,
                      paddingVertical: 14,
                      borderRadius: 15,
                      width: "48%",
                    },
                  ]}
                  disabled={true}
                >
                  <Text
                    style={[
                      styles.textCenterBold,
                      { fontSize: 17, color: theme.pureWhite },
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
                      paddingVertical: 14,
                      borderRadius: 15,
                      width: "48%",
                    },
                  ]}
                  disabled={true}
                >
                  <Text
                    style={[
                      styles.textCenterBold,
                      { fontSize: 17, color: theme.pureWhite },
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
      style={{
        width: CARD_WIDTH,
        alignSelf: "center",
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 8,
        backgroundColor: theme.nestedBG,
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <View style={{ width: "100%", alignItems: "center", marginBottom: 6 }}>
        <Text
          style={[
            styles.textCentered,
            { fontFamily: "Nunito-Bold", fontSize: 31 },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
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

      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={imageSource}
          style={{
            width: "70%",
            aspectRatio: 1,
            minHeight: 190,
            maxHeight: 260,
            alignSelf: "center",
            borderRadius: 12,
          }}
          contentFit="cover"
          transition={300}
        />

        <Text
          style={[
            styles.textCentered,
            {
              fontFamily: "Nunito",
              fontSize: 15,
              lineHeight: 20,
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

        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <Pressable
            style={[
              makeRecipeShadow,
              {
                backgroundColor: theme.primary,
                paddingVertical: 14,
                borderRadius: 15,
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
                { color: theme.pureWhite, fontSize: 18 },
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
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <Pressable
              style={[
                skipShadow,
                {
                  backgroundColor: theme.redBlock,
                  paddingVertical: 14,
                  borderRadius: 15,
                  width: "48%",
                },
              ]}
              onPress={() => {
                props.skipRecipe();
              }}
            >
              <Text style={[styles.textCenterBold, { fontSize: 17 }]}>
                ← Skip
              </Text>
            </Pressable>

            <Pressable
              style={[
                saveShadow,
                {
                  backgroundColor: theme.greenBlock,
                  paddingVertical: 14,
                  borderRadius: 15,
                  width: "48%",
                },
              ]}
              onPress={() => {
                props.saveRecipe();
              }}
            >
              <Text style={[styles.textCenterBold, { fontSize: 17 }]}>
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
