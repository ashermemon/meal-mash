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
import { CustomIcon } from "@/icon-loader/icon-loader";

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
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const [selectedFilter, setSelectedFilter] = useState("All");
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
            Pantry
          </Text>

          <View style={{ gap: 25, flex: 1 }}>
            <PantryPill
              pantryName={pantryDetails.name}
              pantryPage={true}
            ></PantryPill>
            <View style={{ gap: 20, flex: 1 }}>
              <Search
                onSelectIngredient={(item: Food) =>
                  setPantryDetails((prev) => {
                    const alreadyAdded = prev.ingredients.includes(item);
                    const nextIngredients = alreadyAdded
                      ? prev.ingredients
                      : [...prev.ingredients, item];

                    return {
                      ...prev,
                      ingredients: nextIngredients,
                    };
                  })
                }
              />

              <View style={styles.pantryTip}>
                <Text
                  style={[styles.textLeft, { color: "white" }]}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                >
                  <Text style={{ fontFamily: "Nunito-SemiBold" }}>Tip: </Text>
                  Be sure to add any leftover dishes you have at home and want
                  to use in recipes!
                </Text>
                <Image
                  source={require("@/assets/images/leftover.png")}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 110,
                    shadowColor: "black",
                    shadowRadius: 50,
                    shadowOpacity: 1,
                  }}
                />
              </View>

              <View style={{ gap: 10 }}>
                <FilterIngredients
                  setCurrentSelected={setSelectedFilter}
                  currentSelected={selectedFilter}
                  categories={ingredientCategories}
                />
                {pantryDetails.ingredients
                  .toReversed()
                  .map((ingredient: Food, index: number) =>
                    selectedFilter === "All" ? (
                      <IngredientTag
                        key={index}
                        ingredient={ingredient}
                      ></IngredientTag>
                    ) : selectedFilter === ingredient.category ? (
                      <IngredientTag
                        key={index}
                        ingredient={ingredient}
                      ></IngredientTag>
                    ) : (
                      <React.Fragment key={index}></React.Fragment>
                    ),
                  )}
              </View>
              {pantryDetails.ingredients.length < 1 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    paddingHorizontal: 20,
                  }}
                >
                  <CustomIcon
                    name="apple-fruit"
                    filled
                    color={NEWCOLORS.redAccent}
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
                    {pantryDetails.name} is empty
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
                    Add the ingredients you have at home to get started!
                  </Text>
                </View>
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
