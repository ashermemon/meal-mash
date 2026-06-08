import { View, Text } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/NewTheme";
import { COLORS } from "@/constants/Theme";

type Props = {
  sectionTitle: string;
  children: React.ReactNode;
  servings?: number | null;
};

const RecipeSection = (props: Props) => {
  return (
    <View
      style={[
        styles.card,
        {
          marginBottom: 20,
          paddingHorizontal: 10,
          paddingBottom: 15,
          paddingTop: 30,
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
        <Text style={[styles.textLeftBold, { fontSize: 18 }]}>
          {props.sectionTitle}
        </Text>

        {props.servings && (
          <Text
            style={[
              styles.textRight,
              { color: COLORS.searchPlaceholder, fontSize: 13, marginTop: 1 },
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
