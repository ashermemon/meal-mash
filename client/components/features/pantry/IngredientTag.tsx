import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { getCategoryDisplayLabel } from "@/constants/categoryLabels";
import { PantryDetailsContext } from "@/contexts/PantryDetails";
import { Food } from "./Search";

type Props = {
  ingredient: Food;
  onRemove?: () => void;
};

const IngredientTag = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);

  const handleRemoveIngredient = () => {
    if (props.onRemove) {
      props.onRemove();
    } else {
      setPantryDetails((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter(
          (ingredient) => ingredient.name !== props.ingredient.name,
        ),
      }));
    }
  };

  return (
    <View
      style={[
        styles.ingredientPill,
        styles.basicBoxShadow,
        {
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingHorizontal: 10,
          flexDirection: "column",
        }}
      >
        <Text
          numberOfLines={1}
          minimumFontScale={0.5}
          adjustsFontSizeToFit
          style={[
            styles.textLeftSemiBold,
            {
              paddingHorizontal: 3,
              fontSize: 17,
              width: "100%",

              marginLeft: 5,
            },
          ]}
        >
          {props.ingredient.name}
        </Text>

        <Text
          numberOfLines={1}
          style={[
            styles.basicTextLeft,
            {
              paddingHorizontal: 3,
              fontSize: 13,
              marginLeft: 5,
              fontFamily: "Nunito-Regular",
              color: theme.pillX,
            },
          ]}
        >
          {getCategoryDisplayLabel(props.ingredient.category)}
        </Text>
      </View>
      <Pressable
        onPress={handleRemoveIngredient}
        style={{
          marginRight: 20,
          backgroundColor: theme.redAccent,
          padding: 10,
          borderRadius: 1000,
        }}
      >
        <CustomIcon name="close" filled={true} color={theme.pureWhite} size={18} />
      </Pressable>
    </View>
  );
};

export default IngredientTag;
