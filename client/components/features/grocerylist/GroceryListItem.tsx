import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import { Food } from "../pantry/Search";
import * as Haptics from "expo-haptics";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/Theme";
import GroceryListContext from "@/contexts/GroceryListContext";
import { PantryDetailsContext } from "@/contexts/PantryDetails";

type Props = {
  food: Food;
};

const GroceryListItem = (props: Props) => {
  const [, setGroceryList] = useContext(GroceryListContext);
  const [, setPantryDetails] = useContext(PantryDetailsContext);

  const checkOff = () => {
    setGroceryList((prev) =>
      prev.filter((item) => item.id !== props.food.id),
    );
    setPantryDetails((prev) => {
      const alreadyAdded = prev.ingredients.some(
        (item) => item.id === props.food.id,
      );
      return alreadyAdded
        ? prev
        : { ...prev, ingredients: [...prev.ingredients, props.food] };
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 33,
      }}
    >
      <View style={{ marginRight: 12 }}>
        <CustomCheckbox checked={false} onChange={checkOff} size={24} />
      </View>
      <Pressable
        style={{ flex: 1, flexDirection: "row" }}
        onPress={checkOff}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.textLeftSemiBold,
              {
                marginLeft: 0,
                flex: 1,
                fontSize: 15,
                color: COLORS.fontColor,
              },
            ]}
          >
            {props.food.displayName}
          </Text>
        </View>

        <Text
          style={[
            styles.textRight,
            {
              fontSize: 15,
              color: COLORS.searchPlaceholder,
              marginLeft: 12,
            },
          ]}
        >
          {props.food.category}
        </Text>
      </Pressable>
    </View>
  );
};

export default GroceryListItem;
