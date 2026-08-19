import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { storage } from "@/utils/storage";
import { useStyles } from "@/styles/GlobalStyles";
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";

type counterProps = {
  variable: string;
  text: string;
};
export default function Counter(props: counterProps) {
  const styles = useStyles();
  const theme = useTheme();
  const counterShadow = useTintedBoxShadow(theme.cardWhite);
  const totalMeals = storage.getNumber(props.variable) ?? 0;

  return (
    <View
      style={[
        counterShadow,
        {
          backgroundColor: theme.cardWhite,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          flex: 1,

          paddingVertical: 20,
          paddingHorizontal: 5,
        },
      ]}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[
          styles.textCentered,
          { fontSize: 42, fontFamily: "Nunito-Bold" },
        ]}
      >
        {totalMeals}
      </Text>
      <Text
        numberOfLines={2}
        style={[
          styles.textCentered,
          {
            fontSize: 14,
            paddingBottom: 5,
            fontFamily: "Nunito-Medium",
          },
        ]}
      >{`${props.text}`}</Text>
    </View>
  );
}
