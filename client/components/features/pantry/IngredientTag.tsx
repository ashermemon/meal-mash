import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import { PantryDetailsContext } from "@/contexts/PantryDetails";
import { Food } from "./Search";

type Props = {
  ingredient: Food;
  onRemove?: () => void;
};

const IngredientTag = (props: Props) => {
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
          justifyContent: "flex-start",
          alignItems: "center",
          paddingHorizontal: 10,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.5}
            style={[
              styles.textLeftSemiBold,
              {
                width: "100%",
                paddingHorizontal: 3,
                fontSize: 17,
                marginLeft: 5,
              },
            ]}
          >
            {props.ingredient.name}
          </Text>
        </View>

        <View
          style={[
            styles.infoTag,
            {
              justifyContent: "center",
              backgroundColor: NEWCOLORS.purpblueBlock,
              borderRadius: 100,
              marginLeft: 10,
              marginTop: 2,
              flex: 0,
              paddingVertical: 3,
            },
          ]}
        >
          <Text
            style={[
              styles.textLeftSemiBold,
              {
                paddingHorizontal: 10,
                fontSize: 12,

                fontFamily: "Nunito-Medium",
              },
            ]}
          >
            {props.ingredient.category}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={handleRemoveIngredient}
        style={{
          marginRight: 20,
          backgroundColor: NEWCOLORS.redBlock,
          padding: 10,
          borderRadius: 1000,
        }}
      >
        <CustomIcon
          name="close"
          filled={true}
          color={NEWCOLORS.placeholderText}
          size={18}
        />
      </Pressable>
    </View>
  );
};

export default IngredientTag;
