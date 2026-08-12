import { View, Text, Pressable, Dimensions, InteractionManager, Image } from "react-native";
import React, { useEffect } from "react";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import { styles } from "@/styles/GlobalStyles";
import RecipeInfoTags from "../recipe/RecipeInfoTags";
import NutrientsContext from "@/contexts/NutrientsContext";
import { NEWCOLORS } from "@/constants/NewTheme";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
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

const SkeletonSettings = {
  colorMode: "light",
  transition: {
    type: "timing",
    duration: 2000,
  },
} as const;

const MEAL_IMAGES: Record<string, any> = {
  burger: require("@/assets/images/meal-images/burger.webp"),
  pizza: require("@/assets/images/meal-images/pizza.webp"),
  pasta: require("@/assets/images/meal-images/pasta.webp"),
  salad: require("@/assets/images/meal-images/salad.webp"),
  curry: require("@/assets/images/meal-images/curry.webp"),
  "fried-rice": require("@/assets/images/meal-images/fried-rice.webp"),
  sandwich: require("@/assets/images/meal-images/sandwich.webp"),
  taco: require("@/assets/images/meal-images/taco.webp"),
  soup: require("@/assets/images/meal-images/soup.webp"),
  dessert: require("@/assets/images/meal-images/dessert.webp"),
  breakfast: require("@/assets/images/meal-images/breakfast.webp"),
  seafood: require("@/assets/images/meal-images/seafood.webp"),
  steak: require("@/assets/images/meal-images/steak.webp"),
  bowl: require("@/assets/images/meal-images/bowl.webp"),
};

export const GenerationCardPreview = (props: Props) => {

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
          backgroundColor: NEWCOLORS.nestedBG,
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
                  styles.basicBoxShadow,
                  {
                    backgroundColor: NEWCOLORS.primary,
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
                    { color: "white", fontSize: 18 },
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
                    styles.basicBoxShadow,
                    {
                      backgroundColor: NEWCOLORS.redBlock,
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
                      { fontSize: 17, color: "white" },
                    ]}
                  >
                    ← Skip
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.basicBoxShadow,
                    {
                      backgroundColor: NEWCOLORS.greenBlock,
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
                      { fontSize: 17, color: "white" },
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
        backgroundColor: NEWCOLORS.nestedBG,
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <View style={{ width: "100%", alignItems: "center", marginBottom: 6 }}>
        <Text
          style={[
            styles.textCentered,
            { fontFamily: "Nunito-Bold", fontSize: 30 },
          ]}
          numberOfLines={1}
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
          source={MEAL_IMAGES[props.imageCategory] || MEAL_IMAGES.bowl}
          style={{
            width: "70%",
            aspectRatio: 1,
            minHeight: 190,
            maxHeight: 260,
            alignSelf: "center",
            borderRadius: 12,
          }}
          resizeMode="cover"
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

        <NutrientsContext.Provider value={[props.nutrients || [0, 0, 0], () => { }]}>
          <NutrientCircle textInBox={false} />
        </NutrientsContext.Provider>

        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <Pressable
            style={[
              styles.basicBoxShadow,
              {
                backgroundColor: NEWCOLORS.primary,
                paddingVertical: 14,
                borderRadius: 15,
                width: "100%",
              },
            ]}
            onPress={props.makeRecipe}

          //more laggy: InteractionManager.runAfterInteractions(() => { router.navigate("/followRecipe") })
          >
            <Text
              style={[styles.textCenterBold, { color: "white", fontSize: 18 }]}
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
                styles.basicBoxShadow,
                {
                  backgroundColor: NEWCOLORS.redBlock,
                  paddingVertical: 14,
                  borderRadius: 15,
                  width: "48%",
                },
              ]}
              onPress={props.skipRecipe}
            >
              <Text style={[styles.textCenterBold, { fontSize: 17 }]}>
                ← Skip
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.basicBoxShadow,
                {
                  backgroundColor: NEWCOLORS.greenBlock,
                  paddingVertical: 14,
                  borderRadius: 15,
                  width: "48%",
                },
              ]}
              onPress={props.saveRecipe}
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
