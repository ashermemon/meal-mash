import { View, Text } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {
  suggestedIngredients: string[];
};

const SuggestedIngredients = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text style={styles.basicTextLeft}>Suggested:</Text>

      {props.suggestedIngredients.map((string, index: number) => (
        <View
          key={index}
          style={[
            styles.selectPill,
            styles.basicBoxShadow,
            {
              justifyContent: "center",
              alignItems: "center",

              height: 30,
            },
          ]}
        >
          <Text style={styles.basicTextCenter}>{string}</Text>
        </View>
      ))}
    </View>
  );
};

export default SuggestedIngredients;
