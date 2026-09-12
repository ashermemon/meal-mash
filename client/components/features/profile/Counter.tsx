import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import { moderateScale } from "@/utils/responsive";

type counterProps = {
  value: number;
  text: string;
};
export default function Counter(props: counterProps) {
  const styles = useStyles();
  const theme = useTheme();
  const counterShadow = useTintedBoxShadow(theme.cardWhite);

  return (
    <View
      style={[
        counterShadow,
        {
          backgroundColor: theme.cardWhite,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: moderateScale(15),
          flex: 1,

          paddingVertical: moderateScale(20),
          paddingHorizontal: moderateScale(5),
        },
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.textCentered,
          { fontSize: moderateScale(42), fontFamily: "Nunito-Bold" },
        ]}
      >
        {props.value}
      </Text>
      <Text
        numberOfLines={2}
        style={[
          styles.textCentered,
          {
            fontSize: moderateScale(14),
            paddingBottom: moderateScale(5),
            fontFamily: "Nunito-Medium",
          },
        ]}
      >{`${props.text}`}</Text>
    </View>
  );
}
