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
import icons3d from "@/components/universal/3dIcons";
import * as Haptics from "expo-haptics";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";

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

  const cardBackgroundColor = selected
    ? theme.greenAccent
    : theme.unselectedGrey;
  const cardShadow = useTintedBoxShadow(cardBackgroundColor);

  return (
    <Pressable
      style={[
        styles.ingredientPickerCard,
        cardShadow,
        {
          backgroundColor: cardBackgroundColor,
        },
      ]}
      onPress={() => {
        if (props.selectionMenuOptions.length === 0) {
          Haptics.selectionAsync();
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
      <View style={[{ width: 40, height: 40, borderRadius: 110 }]}>
        <Image
          source={
            (props.ingredient?.name && icons3d[props.ingredient?.name]) ||
            (props.ingredientName && icons3d[props.ingredientName]) ||
            icons3d["Default"]
          }
          style={{ width: "100%", height: "100%", borderRadius: 110 }}
          contentFit="cover"
        />
      </View>
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
