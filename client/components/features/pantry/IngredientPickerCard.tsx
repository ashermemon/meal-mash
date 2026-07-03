import { View, Text, ViewStyle, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "@/styles/auth.styles";
import { Image } from "expo-image";
import { NEWCOLORS } from "@/constants/NewTheme";
import { IosAllowsPreviews } from "expo-notifications";
import { useTrueSheet } from "@/contexts/TrueSheetContext";
import { openDropDown } from "@/components/common/DropDownPill";

type Props = {
  ingredientName: string;
  multiSelect?: boolean;
  selectionMenuOptions: string[];
};

const IngredientPickerCard = (props: Props) => {
  const { openSheet } = useTrueSheet();
  const [selected, setSelected] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const hasValidSelection = selectedOptions.some(
      (opt) => opt && opt.trim().length > 0,
    );
    setSelected(hasValidSelection);
  }, [selectedOptions]);

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
      onPress={() => {
        props.selectionMenuOptions.length == 0
          ? setSelected((prev) => !prev)
          : openDropDown(
              openSheet,
              props.ingredientName,
              props.selectionMenuOptions,
              selectedOptions,
              setSelectedOptions,
              true,
            );
      }}
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
