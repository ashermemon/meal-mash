import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import { PantryDetailsContext } from "@/contexts/PantryDetails";

type Props = {
  ingredientName: string;
  category: string;
};

const IngredientTag = (props: Props) => {
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);

  const handleRemoveIngredient = () => {
    setPantryDetails((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter(
        (ingredient) => ingredient !== props.ingredientName,
      ),
    }));
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
        <Text
          style={[
            styles.textLeftSemiBold,
            { paddingHorizontal: 3, fontSize: 17, marginLeft: 5 },
          ]}
        >
          {props.ingredientName}
        </Text>
        <View
          style={[
            styles.infoTag,
            {
              justifyContent: "center",
              backgroundColor: NEWCOLORS.purpblueBlock,
              borderRadius: 100,
              marginLeft: 10,
              marginTop: 2,
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
            {props.category}
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
