import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import { styles } from "@/styles/GlobalStyles";
import { Image } from "expo-image";
import RecipeInfoTags from "../recipe/RecipeInfoTags";
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
};


const SkeletonSettings = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 2000,
  },
} as const;

export const GenerationCardPreview = (props: Props) => {
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
      <Skeleton.Group show={props.isLoading ?? false}>
        {/* Header Block (Title and Tags) */}
        <View style={{ width: "100%", alignItems: "center", marginBottom: 6 }}>
          {props.isLoading ? (
            <Skeleton
              width={200}
              height={32}
              radius={8}
              {...SkeletonSettings}
            />
          ) : (
            <Text
              style={[
                styles.textCentered,
                { fontFamily: "Nunito-Bold", fontSize: 30 },
              ]}
              numberOfLines={1}
            >
              {props.title}
            </Text>
          )}

          {props.isLoading ? (
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                marginTop: 13,
                justifyContent: "center",
              }}
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
          ) : (
            <RecipeInfoTags
              difficulty={props.difficulty}
              time={props.time}
              tags={props.tags}
              justifyContent="center"
            />
          )}
        </View>

        {/* Body Block (Image, Description, Nutrients, Buttons) */}
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          {/* Image */}
          {props.isLoading ? (
            <View
              style={{
                width: "70%",
                aspectRatio: 1,
                minHeight: 190,
                maxHeight: 260,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Skeleton
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                radius="round"
                {...SkeletonSettings}
              />
            </View>
          ) : (
            <Image
              source={require("../../../assets/images/mealExample.png")}
              style={{
                width: "70%",
                aspectRatio: 1,
                minHeight: 190,
                maxHeight: 260,
                alignSelf: "center",
                borderRadius: 12,
              }}
              contentFit="cover"
              transition={0}
            />
          )}

          {/* Description */}
          {props.isLoading ? (
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
          ) : (
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
          )}

          {/* Nutrient Circle */}
          {props.isLoading ? (
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
                height={140}
                radius={15}
                {...SkeletonSettings}
              />
            </View>
          ) : (
            <NutrientCircle textInBox={false} />
          )}

          {/* Action Buttons */}
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 10,
              opacity: props.isLoading ? 0.4 : 1,
            }}
            pointerEvents={props.isLoading ? "none" : "auto"}
          >
            <Pressable
              style={[
                styles.basicBoxShadow,
                {
                  backgroundColor: NEWCOLORS.darkButton,
                  paddingVertical: 14,
                  borderRadius: 15,
                  width: "100%",
                },
              ]}
              onPress={() => router.push("/followRecipe")}
              disabled={props.isLoading}
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
                onPress={props.skipRecipe}
                disabled={props.isLoading}
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
                disabled={props.isLoading}
              >
                <Text style={[styles.textCenterBold, { fontSize: 17 }]}>
                  Save →
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Skeleton.Group>
    </Animated.View>
  );
};

export default GenerationCardPreview;
