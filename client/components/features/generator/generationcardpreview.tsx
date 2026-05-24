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

const GenerationCardPreview = (props: Props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={[
          styles.textCentered,
          { fontFamily: "Nunito-Bold", fontSize: 25, marginBottom: 5 },
        ]}
      >
        {props.title}
      </Text>

      <RecipeInfoTags
        difficulty={props.difficulty}
        time={props.time}
        tags={props.tags}
      />

      <Image
        source={require("../../../assets/images/mealExample.png")}
        style={{
          width: "65%",
          aspectRatio: 1,
          alignSelf: "center",
          marginVertical: 25,
          borderRadius: 12,
        }}
        contentFit="cover"
      />

      <>
        <Text
          style={[
            styles.textCentered,
            { fontFamily: "Nunito", fontSize: 17, marginBottom: 25 },
          ]}
        >
          {props.description}
        </Text>
      </>

      <NutrientCircle />

      <Pressable
        style={[
          styles.basicBoxShadow,
          {
            backgroundColor: NEWCOLORS.darkButton,
            paddingVertical: 20,
            borderRadius: 15,
            width: "90%",
          },
        ]}
      >
        <Text style={[styles.textCenterBold, { color: "white", fontSize: 20 }]}>
          Make Recipe
        </Text>
      </Pressable>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          gap: "4%",
          marginTop: 15,
          justifyContent: "center",
        }}
      >
        <Pressable
          style={[
            styles.basicBoxShadow,
            {
              backgroundColor: NEWCOLORS.redBlock,
              paddingVertical: 20,
              borderRadius: 15,
              width: "43%",
            },
          ]}
        >
          <Text style={[styles.textCenterBold, { fontSize: 20 }]}>← Skip</Text>
        </Pressable>

        <Pressable
          style={[
            styles.basicBoxShadow,
            {
              backgroundColor: NEWCOLORS.greenBlock,
              paddingVertical: 20,
              borderRadius: 15,
              width: "43%",
            },
          ]}
        >
          <Text style={[styles.textCenterBold, { fontSize: 20 }]}>Save →</Text>
        </Pressable>
      </View>

      {/* ---------- */}

      {/*<Text
        style={[
          styles.textCentered,
          { fontFamily: "Nunito-Bold", fontSize: 16 },
        ]}
      >
        bold:
      </Text>*/}
    </View>
  );
};

export default GenerationCardPreview;
