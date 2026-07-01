import { View, Text, ViewStyle, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/auth.styles";
import { Image } from "expo-image";
import { NEWCOLORS } from "@/constants/NewTheme";
import { IosAllowsPreviews } from "expo-notifications";

type Props = {
  ingredientName: string;
  multiSelect?: boolean;
  selectionMenu?: boolean;
  selectionMenuOptions?: string[];
};

const IngredientPickerCard = (props: Props) => {
  const [selected, setSelected] = useState(false);
  return (
    <Pressable
      style={[
        styles.ingredientPickerCard,
        styles.basicBoxShadow,
        {
          backgroundColor: selected
            ? NEWCOLORS.greenAccent
            : NEWCOLORS.unselectedGrey,
        },
      ]}
      onPress={() => setSelected((prev) => !prev)}
    >
      <Image
        source={require("@/assets/images/meal-images/burger.png")}
        style={{
          width: 40,
          height: 40,
          borderRadius: 110,
          shadowColor: "black",
          shadowRadius: 50,
          shadowOpacity: 1,
        }}
        contentFit="cover"
      />
      <Text
        style={[
          styles.textLeftSemiBold,
          {
            textAlign: "center",
            fontSize: 13,
            marginTop: 5,
            fontFamily: selected ? "Nunito-Bold" : "Nunito-SemiBold",
            color: selected ? "white" : NEWCOLORS.basicText,
          },
        ]}
      >
        {props.ingredientName}
      </Text>
    </Pressable>
  );
};

export default IngredientPickerCard;
