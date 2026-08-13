import { View, Text, ViewStyle, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { Image } from "expo-image";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { IosAllowsPreviews } from "expo-notifications";
import { useTrueSheet } from "@/contexts/TrueSheetContext";
import { openDropDown } from "@/components/common/DropDownPill";
import { PantryDetailsContext } from "@/contexts/PantryDetails";
import { Food } from "./Search";

type Props = {
  ingredient?: Food;
  ingredientName?: string;
  multiSelect?: boolean;
  selectionMenuOptions: Array<string | Food>;
};

const IngredientPickerCard = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const { openSheet } = useTrueSheet();
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const [selected, setSelected] = useState(false);

  const ingredientValue: Food = props.ingredient ?? {
    id: 0,
    name: props.ingredientName ?? "",
    category: "",
    displayName: props.ingredientName ?? "",
  };

  const getInitialSelectedOptions = () => {
    if (props.selectionMenuOptions.length === 0) {
      const selected = pantryDetails.ingredients.some(
        (item) => item.name === ingredientValue.name,
      );
      return selected ? [ingredientValue] : [];
    }

    return pantryDetails.ingredients.filter((item) =>
      props.selectionMenuOptions.some((option) => {
        const optionName = typeof option === "string" ? option : option.name;
        return optionName === item.name;
      }),
    );
  };

  const [selectedOptions, setSelectedOptions] = useState<Food[]>(
    getInitialSelectedOptions,
  );

  useEffect(() => {
    const cleanSelectedOptions = selectedOptions.filter(
      (opt) => opt && opt.name.trim().length > 0,
    );
    const hasValidSelection = cleanSelectedOptions.length > 0;
    setSelected(hasValidSelection);

    setPantryDetails((prev) => {
      const filteredIngredients = (prev.ingredients || []).filter(
        (item) =>
          item &&
          item.name.trim().length > 0 &&
          !props.selectionMenuOptions.some((option) => {
            const optionName =
              typeof option === "string" ? option : option.name;
            return optionName === item.name;
          }) &&
          item.name !== ingredientValue.name,
      );

      return {
        ...prev,
        ingredients: [...filteredIngredients, ...cleanSelectedOptions],
      };
    });
  }, [
    selectedOptions,
    ingredientValue.name,
    props.selectionMenuOptions.length,
    // setPantryDetails,
  ]);

  useEffect(() => {
    if (
      selected &&
      props.selectionMenuOptions.length === 0 &&
      selectedOptions.length === 0
    ) {
      setSelectedOptions([ingredientValue]);
    }
  }, [selected]);

  return (
    <Pressable
      style={[
        styles.ingredientPickerCard,
        styles.basicBoxShadow,
        {
          backgroundColor: selected ? theme.greenAccent : theme.unselectedGrey,
        },
      ]}
      onPress={() => {
        if (props.selectionMenuOptions.length === 0) {
          if (selected) {
            setSelectedOptions([]);
            setSelected(false);
          } else {
            setSelected(true);
            setSelectedOptions([ingredientValue]);
          }
        } else {
          openDropDown(
            openSheet,
            ingredientValue.name,
            props.selectionMenuOptions.map((option) =>
              typeof option === "string" ? option : option.name,
            ),
            selectedOptions.map((option) => option.name),
            ((nextValue: React.SetStateAction<string[]>) => {
              const resolvedOptions =
                typeof nextValue === "function"
                  ? nextValue(selectedOptions.map((option) => option.name))
                  : nextValue;
              const nextFoods = resolvedOptions.map((name: string) => ({
                ...ingredientValue,
                name,
              }));
              setSelectedOptions(nextFoods);
            }) as React.Dispatch<React.SetStateAction<string[]>>,
            true,
          );
        }
      }}
    >
      <Image
        source={require("@/assets/images/meal-images/burger.webp")}
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
            color: selected ? theme.pureWhite : theme.basicText,
          },
        ]}
      >
        {props.ingredientName ?? ingredientValue.name}
      </Text>
    </Pressable>
  );
};

export default IngredientPickerCard;
