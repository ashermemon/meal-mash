import {
  View,
  Text,
  Pressable,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import React, { useContext, useState } from "react";
import { NEWCOLORS } from "@/constants/NewTheme";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import CheckedGroceryListContext from "@/contexts/CheckedGroceryListContext";
import GroceryListContext from "@/contexts/GroceryListContext";
import { PantryDetailsContext } from "@/contexts/PantryDetails";
import { Food } from "@/components/features/pantry/Search";
import GroceryListItem from "./GroceryListItem";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CheckedGroceryList = () => {
  const [checkedList, setCheckedList] = useContext(CheckedGroceryListContext);
  const [groceryList, setGroceryList] = useContext(GroceryListContext);
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const [expanded, setExpanded] = useState(false);

  if (checkedList.length < 1) return null;

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  const uncheckAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const restoredIds = new Set(checkedList.map((item: Food) => item.id));

    setGroceryList((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const restored = checkedList.filter(
        (item: Food) => !existingIds.has(item.id),
      );
      return [...prev, ...restored];
    });
    setPantryDetails((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((item) => !restoredIds.has(item.id)),
    }));
    setExpanded(false);
    setCheckedList([]);
  };

  return (
    <View
      style={{
        position: "absolute",
        left: 20,
        right: 20,
        bottom: 90,
        zIndex: 30,
      }}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.basicBoxShadow,
          {
            backgroundColor: NEWCOLORS.cardWhite,
            borderRadius: 26,
            paddingHorizontal: 18,
            paddingVertical: 16,
            gap: 14,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={toggleExpanded}
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CustomIcon
              name={expanded ? "up-small" : "down-small"}
              filled
              color={NEWCOLORS.placeholderText}
              size={20}
            />
            <Text
              style={[
                styles.textLeftBold,
                {
                  fontFamily: "Nunito-SemiBold",
                  fontSize: 16,
                  color: NEWCOLORS.basicText,
                },
              ]}
            >
              Checked ({checkedList.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={uncheckAll}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text
              style={[
                styles.textLeftBold,
                {
                  fontFamily: "Nunito-SemiBold",
                  fontSize: 14,
                  color: NEWCOLORS.blueAccent,
                },
              ]}
            >
              Uncheck All
            </Text>
          </Pressable>
        </View>

        {expanded && (
          <ScrollView
            style={{ maxHeight: 200 }}
            showsVerticalScrollIndicator={true}
            bounces={false}
          >
            <View style={{ gap: 25 }}>
              {checkedList.map((food: Food) => (
                <GroceryListItem key={food.id} food={food} variant="checked" />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default CheckedGroceryList;
