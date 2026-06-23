import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {
  ingredientName: string;
  flex?: number;
};

const IngredientTag = (props: Props) => {
  return (
    <View
      style={[
        styles.ingredientPill,
        styles.basicBoxShadow,
        {
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          height: 30,
          ...(props.flex !== undefined ? { flex: props.flex } : {}),
        },
      ]}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[
            styles.basicTextCenter,
            { paddingHorizontal: 3, fontSize: 13, marginLeft: 5 },
          ]}
        >
          {props.ingredientName}
        </Text>
      </View>
      <Pressable style={{ marginRight: 10 }}>
        <CustomIcon
          name="close-medium"
          filled={true}
          color={NEWCOLORS.pillX}
          size={18}
        />
      </Pressable>
    </View>
  );
};

export default IngredientTag;
