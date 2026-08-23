import { View, Text } from "react-native";
import React from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";

type Props = {
  sectionTitle?: string;
  children: React.ReactNode;
  servings?: number | null;
  titleOff?: boolean;
};

const RecipeSection = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          marginBottom: props.titleOff ? 0 : 20,
          paddingHorizontal: 10,
          paddingBottom: props.titleOff ? 0 : 15,
          paddingTop: props.titleOff ? 5 : 30,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        {props.titleOff ? (
          <></>
        ) : (
          <Text style={[styles.textLeftBold, { fontSize: 18 }]}>
            {props.sectionTitle}
          </Text>
        )}

        {props.servings && (
          <Text
            style={[
              styles.textRight,
              { color: theme.searchPlaceholder, fontSize: 13, marginTop: 1 },
            ]}
          >
            {props.servings === 1
              ? `Makes ${props.servings} serving`
              : `Makes ${props.servings} servings`}
          </Text>
        )}
      </View>
      <View>{props.children}</View>
    </View>
  );
};

export default RecipeSection;
