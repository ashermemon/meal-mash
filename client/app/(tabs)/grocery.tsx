import { Alert, Animated, Pressable, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { NEWCOLORS } from "@/constants/NewTheme";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import PantryPill from "@/components/features/pantry/PantryPill";
import { ScrollView } from "react-native-gesture-handler";
import { CustomIcon } from "@/icon-loader/icon-loader";

import { LinearGradient } from "expo-linear-gradient";

import { PantryDetailsContext } from "@/contexts/PantryDetails";
import FilterIngredients from "@/components/features/pantry/FilterIngredients";
import IngredientTag from "@/components/features/pantry/IngredientTag";
import Search, { Food } from "@/components/features/pantry/Search";
import GroceryListContext from "@/contexts/GroceryListContext";
import CheckedGroceryListContext from "@/contexts/CheckedGroceryListContext";
import GroceryListItem from "@/components/features/grocerylist/GroceryListItem";
import CheckedGroceryList from "@/components/features/grocerylist/CheckedGroceryList";

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
  const [checkedList, setCheckedList] = useContext(CheckedGroceryListContext);

  const hasAnyItems = groceryList.length > 0 || checkedList.length > 0;

  const clearList = () => {
    Alert.alert(
      "Clear grocery list?",
      "This removes every item on your list, including checked ones. This can't be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear List",
          style: "destructive",
          onPress: () => {
            setGroceryList([]);
            setCheckedList([]);
          },
        },
      ],
    );
  };

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
          paddingBottom: 170,
        }}
        overScrollMode="never"
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            flex: 1,

            position: "relative",

            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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

            {hasAnyItems ? (
              <Pressable
                onPress={clearList}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <CustomIcon
                  name="delete-2"
                  filled
                  color={NEWCOLORS.placeholderText}
                  size={14}
                />
                <Text
                  style={[
                    styles.textLeftBold,
                    {
                      fontFamily: "Nunito-SemiBold",
                      fontSize: 14,
                      color: NEWCOLORS.placeholderText,
                    },
                  ]}
                >
                  Clear List
                </Text>
              </Pressable>
            ) : null}
          </View>

          <View style={{ gap: 25, flex: 1 }}>
            <View style={{ gap: 20, flex: 1 }}>
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

              <View style={{ gap: 35, paddingHorizontal: 10, marginTop: 10 }}>
                {groceryList.map((ingredient: Food) => (
                  <GroceryListItem
                    key={ingredient.id}
                    food={ingredient}
                  ></GroceryListItem>
                ))}
              </View>
              {groceryList.length < 1 ? (
                checkedList.length > 0 ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      paddingHorizontal: 20,
                      transform: [{ translateY: -50 }],
                    }}
                  >
                    <CustomIcon
                      name="celebrate"
                      filled
                      color={NEWCOLORS.greenAccent}
                      size={36}
                    />
                    <Text
                      style={[
                        styles.textCenterBold,
                        {
                          fontFamily: "Nunito-Bold",
                          fontSize: 20,
                          color: NEWCOLORS.basicText,
                        },
                      ]}
                    >
                      All done!
                    </Text>
                    <Text
                      style={[
                        styles.textCentered,
                        {
                          fontFamily: "Nunito-SemiBold",
                          fontSize: 15,
                          color: NEWCOLORS.placeholderText,
                          textAlign: "center",
                        },
                      ]}
                    >
                      Time to get cooking!
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      paddingHorizontal: 20,
                      transform: [{ translateY: -50 }],
                    }}
                  >
                    <CustomIcon
                      name="list-check-3"
                      filled={false}
                      color={NEWCOLORS.blueAccent}
                      size={36}
                    />
                    <Text
                      style={[
                        styles.textCenterBold,
                        {
                          fontFamily: "Nunito-Bold",
                          fontSize: 20,
                          color: NEWCOLORS.basicText,
                        },
                      ]}
                    >
                      Your list is empty
                    </Text>
                    <Text
                      style={[
                        styles.textCentered,
                        {
                          fontFamily: "Nunito-SemiBold",
                          fontSize: 15,
                          color: NEWCOLORS.placeholderText,
                          textAlign: "center",
                        },
                      ]}
                    >
                      Start by adding ingredients you need to buy
                    </Text>
                  </View>
                )
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <CheckedGroceryList />

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
