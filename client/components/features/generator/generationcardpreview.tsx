import { View, Text } from "react-native";
import React from "react";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import { styles } from "@/styles/GlobalStyles";
import { Image } from "expo-image";

type Props = {
  title: string | undefined;
  description: string;
  difficulty: string;
  time: string;
  tags: string[];
};

const GenerationCardPreview = (props: Props) => {
  return (
    <View>
      <Text
        style={[
          styles.textCentered,
          { fontFamily: "Nunito-Bold", fontSize: 25 },
        ]}
      >
        {props.title}
      </Text>

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
          style={[styles.textCentered, { fontFamily: "Nunito", fontSize: 17 }]}
        >
          {props.description}
        </Text>
      </>

      <Text>{props.difficulty}</Text>
      <Text>{props.time}</Text>
      {props.tags.map((tag, index) => (
        <Text key={index}>{tag}</Text>
      ))}

      <NutrientCircle />

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
