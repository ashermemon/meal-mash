import { View, Text, ColorValue } from "react-native";
import React, { ReactNode } from "react";
import { useStyles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { Image } from "expo-image";

type Props = {
  title: string;
  description: string;
  unlocked: boolean;
  emoji: ReactNode;
  color: ColorValue;
};

const Achievement = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <View
      style={[
        styles.savesCard,
        styles.basicBoxShadow,
        {
          backgroundColor: props.unlocked ? props.color : theme.unselectedGrey,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <View style={{ paddingBottom: 2 }}>{props.emoji}</View>
        <View>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              styles.textLeftBold,
              {
                fontFamily: "Nunito-Bold",

                color: theme.basicText,
              },
            ]}
          >
            {props.title}
          </Text>
          <Text
            style={[
              styles.textLeftBold,
              {
                fontFamily: "Nunito-SemiBold",
                fontSize: 15,
                color: theme.placeholderText,
              },
            ]}
          >
            {props.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Achievement;
