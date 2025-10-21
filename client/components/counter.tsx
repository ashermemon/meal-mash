import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { storage } from "@/utils/storage";
import { styles } from "@/styles/auth.styles";
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";
import { COLORS } from "@/constants/theme";

type counterProps = {
  variable: string;
  text: string;
};
export default function Counter(props: counterProps) {
  const totalMeals = storage.getNumber(props.variable) ?? 0;

  return (
    <View
      style={[
        {
          backgroundColor: "white",
          borderColor: COLORS.addButtonStroke,
          borderWidth: 5,
          borderRadius: 20,
          margin: 10,
          paddingVertical: 20,
          width: "85%",
        },
      ]}
    >
      <Text
        style={[
          styles.textCentered,
          { fontSize: 18, fontFamily: "Nunito-SemiBold" },
        ]}
      >{`${props.text}`}</Text>
      <View style={styles.counterBtn}>
        <Text
          style={[
            styles.textCentered,
            { fontSize: 16, fontFamily: "Nunito-Bold" },
          ]}
        >
          {totalMeals}
        </Text>
      </View>
    </View>
  );
}
