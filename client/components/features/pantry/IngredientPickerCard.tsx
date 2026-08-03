import { View, Text, ViewStyle, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/auth.styles";
import { Image } from "expo-image";
import { NEWCOLORS } from "@/constants/NewTheme";
import { IosAllowsPreviews } from "expo-notifications";
import { useTrueSheet } from "@/contexts/TrueSheetContext";
import { openDropDown } from "@/components/common/DropDownPill";
import { PantryDetailsContext } from "@/contexts/PantryDetails";

type Props = {
  ingredientName: string;
  multiSelect?: boolean;
  selectionMenuOptions: string[];
};

const IngredientPickerCard = (props: Props) => {
  const { openSheet } = useTrueSheet();
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const [selected, setSelected] = useState(false);
  const getInitialSelectedOptions = () => {
    if (props.selectionMenuOptions.length === 0) {
      return pantryDetails.ingredients.includes(props.ingredientName)
        ? [props.ingredientName]
        : [];
    }

    return pantryDetails.ingredients.filter((item) =>
      props.selectionMenuOptions.includes(item),
    );
  };

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    getInitialSelectedOptions,
  );

  useEffect(() => {
    const cleanSelectedOptions = selectedOptions.filter(
      (opt) => opt && opt.trim().length > 0,
    );
    const hasValidSelection = cleanSelectedOptions.length > 0;
    setSelected(hasValidSelection);

    setPantryDetails((prev) => {
      const filteredIngredients = (prev.ingredients || []).filter(
        (item) =>
          item &&
          item.trim().length > 0 &&
          !props.selectionMenuOptions.includes(item) &&
          item !== props.ingredientName,
      );

      return {
        ...prev,
        ingredients: [...filteredIngredients, ...cleanSelectedOptions],
      };
    });
    console.log(pantryDetails.ingredients);
  }, [selectedOptions]);

  useEffect(() => {
    if (
      selected &&
      props.selectionMenuOptions.length === 0 &&
      selectedOptions.length === 0
    ) {
      setSelectedOptions([props.ingredientName]);
    }
  }, [selected]);

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
        if (props.selectionMenuOptions.length === 0) {
          if (selected) {
            setSelectedOptions([]);
            setSelected(false);
          } else {
            setSelected(true);
          }
        } else {
          openDropDown(
            openSheet,
            props.ingredientName,
            props.selectionMenuOptions,
            selectedOptions,
            setSelectedOptions,
            true,
          );
        }
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
