import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import { styles } from "@/styles/GlobalStyles";
import { Image } from "expo-image";
import RecipeInfoTags from "../recipe/RecipeInfoTags";
import { NEWCOLORS } from "@/constants/NewTheme";
import { router } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_HORIZONTAL_MARGIN = 13;
const CARD_WIDTH = SCREEN_WIDTH - CARD_HORIZONTAL_MARGIN * 2;

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
};

export const GenerationCardPreview = (props: Props) => {
  return (
    <View
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
        {/*
        <View style={{ width: "100%", marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            {props.servings !== null && (
              <View
                style={{
                  backgroundColor: NEWCOLORS.secondaryBoxGrey,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
              >
                <Text style={[styles.textCenterBold, { fontSize: 13 }]}>Serves {props.servings}</Text>
              </View>
            )}
            <View
              style={{
                backgroundColor: NEWCOLORS.secondaryBoxGrey,
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
            >
              <Text style={[styles.textCenterBold, { fontSize: 13 }]}>Steps {props.steps}</Text>
            </View>
          </View>
        </View>
        */}

        <NutrientCircle textInBox={false} />

        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
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
    </View>
  );
};

export default GenerationCardPreview;
