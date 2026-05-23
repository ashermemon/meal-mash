import { View, Text } from "react-native";
import React from "react";
import NutrientCircle from "@/components/features/recipe/NutrientCircle";
import { styles } from "@/styles/GlobalStyles";

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
          { fontFamily: "Nunito-Bold", fontSize: 23 },
        ]}
      >
        {props.title}
      </Text>

      <>
        <Text>{"\n"}</Text>
        <Text
          style={[
            styles.textCentered,
            { fontFamily: "Nunito-Italic", fontSize: 20 },
          ]}
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
