import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {};

const AddIngredientTag = (props: Props) => {
  return (
    <Pressable
      style={[
        styles.ingredientPill,
        styles.basicBoxShadow,
        {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          height: 30,
          flex: undefined,
          width: 60,
          backgroundColor: NEWCOLORS.secondaryBoxGrey,
        },
      ]}
    >
      <CustomIcon
        name="add"
        filled={true}
        color={NEWCOLORS.placeholderText}
        size={13}
      />
    </Pressable>
  );
};

export default AddIngredientTag;
