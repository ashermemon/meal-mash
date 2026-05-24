import { View, Text, Pressable } from "react-native";
import React from "react";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import { styles } from "@/styles/GlobalStyles";
import { Image } from "expo-image";
import RecipeInfoTags from "../recipe/RecipeInfoTags";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {
  title: string | undefined;
  description: string;
  difficulty: string;
  time: string;
  tags: string[];
};

export const GenerationCardPreview = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        paddingVertical: 8,
      }}
    >
      <View style={{ width: "100%", alignItems: "center", marginBottom: 8 }}>
        <Text
          style={[
            styles.textCentered,
            { fontFamily: "Nunito-Bold", fontSize: 24, marginBottom: 4 },
          ]}
          numberOfLines={1}
        >
          {props.title}
        </Text>

        <RecipeInfoTags
          difficulty={props.difficulty}
          time={props.time}
          tags={props.tags}
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

        <NutrientCircle />

        <View style={{ width: "100%", alignItems: "center" }}>
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
