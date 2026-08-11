import { Animated, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { NEWCOLORS } from "@/constants/NewTheme";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import PantryPill from "@/components/features/pantry/PantryPill";
import { ScrollView } from "react-native-gesture-handler";

import { LinearGradient } from "expo-linear-gradient";

import { PantryDetailsContext } from "@/contexts/PantryDetails";
import FilterIngredients from "@/components/features/pantry/FilterIngredients";
import IngredientTag from "@/components/features/pantry/IngredientTag";
import Search, { Food } from "@/components/features/pantry/Search";
import GroceryListContext from "@/contexts/GroceryListContext";
import GroceryListItem from "@/components/features/grocerylist/GroceryListItem";

export default function Dashboard() {
  const searchOverlayOpacity = useRef(new Animated.Value(0)).current;
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    Animated.timing(searchOverlayOpacity, {
      toValue: searchActive ? 0.75 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [searchActive, searchOverlayOpacity]);
  const navigation = useNavigation();
  const [groceryList, setGroceryList] = useContext(GroceryListContext);
  const ingredientCategories: string[] = [
    "All",
    "Produce",
    "Meat & Poultry",
    "Seafood",
    "Dairy & Eggs",
    "Grains & Carbs",
    "Legumes, Nuts & Seeds",
    "Pantry & Seasonings",
    "Prepared",
    "Other",
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: NEWCOLORS.backgroundColor,
        position: "relative",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 25,
          paddingTop: 20,
          paddingBottom: 130,
        }}
        overScrollMode="never"
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            flex: 1,

            position: "relative",

            gap: 20,
          }}
        >
          <Text
            style={[
              styles.basicTextLeft,
              styles.bold,
              {
                fontSize: 28,
              },
            ]}
          >
            Grocery List
          </Text>

          <View style={{ gap: 25 }}>
            <View style={{ gap: 20 }}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[
                  styles.textLeftBold,
                  {
                    fontFamily: "Nunito-SemiBold",
                    fontSize: 17,

                    color: NEWCOLORS.placeholderText,
                  },
                ]}
              >
                Items are added to your pantry when checked off!
              </Text>
              <Search
                isGroceryList
                onSelectIngredient={(item: Food) =>
                  setGroceryList((prev) => {
                    const alreadyAdded = prev.some(
                      (food) => food.id === item.id,
                    );
                    return alreadyAdded ? prev : [...prev, item];
                  })
                }
              />

              <View style={{ gap: 10 }}>
                {groceryList
                  .toReversed()
                  .map((ingredient: Food) => (
                    <GroceryListItem
                      key={ingredient.id}
                      food={ingredient}
                    ></GroceryListItem>
                  ))}
              </View>
              {groceryList.length < 1 ? (
                <>
                  {/* <Text
                    style={[
                      styles.textCenterBold,
                      {
                        fontFamily: "Nunito-SemiBold",
                        fontSize: 16,

                        color: NEWCOLORS.placeholderText,
                      },
                    ]}
                  >
                    Start by adding any ingredients you need to buy by searching
                    above!
                  </Text> */}
                  <Text
                    style={[
                      styles.textLeftBold,
                      {
                        fontFamily: "Nunito-SemiBold",
                        fontSize: 18,
                        paddingTop: 5,
                        paddingHorizontal: 15,
                        color: NEWCOLORS.placeholderText,
                      },
                    ]}
                  >
                    Suggestions:
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <LinearGradient
        colors={[
          "rgba(255, 248, 237, 0)",
          "rgba(255, 248, 237, 0.75)",
          "rgba(255, 248, 237, 0.98)",
          NEWCOLORS.backgroundColor,
        ]}
        locations={[0, 0.4, 0.75, 1]}
        style={{
          position: "absolute",
          bottom: -40,
          left: 0,
          right: 0,
          height: 160,
          zIndex: 10,
        }}
        pointerEvents="none"
      />
    </View>
  );
}
