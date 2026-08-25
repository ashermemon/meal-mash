import { Animated as RNAnimated, Text, View } from "react-native";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Reanimated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import PantryPill from "@/components/features/pantry/PantryPill";
import { ScrollView } from "react-native-gesture-handler";
import { hexToRgba } from "@/utils/color";

import { LinearGradient } from "expo-linear-gradient";

import { PantryDetailsContext } from "@/contexts/PantryDetails";
import { ingredientKey, usePantryDisplayName } from "@/utils/storage";
import FilterIngredients from "@/components/features/pantry/FilterIngredients";
import IngredientTag from "@/components/features/pantry/IngredientTag";
import Search, { Food } from "@/components/features/pantry/Search";
import { CustomIcon } from "@/icon-loader/icon-loader";
import icons3d from "@/components/universal/3dIcons";
import { getCategoryDisplayLabel } from "@/constants/categoryLabels";

export default function Dashboard() {
  const styles = useStyles();
  const theme = useTheme();
  const searchOverlayOpacity = useRef(new RNAnimated.Value(0)).current;
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    RNAnimated.timing(searchOverlayOpacity, {
      toValue: searchActive ? 0.75 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [searchActive, searchOverlayOpacity]);
  const navigation = useNavigation();
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const pantryDisplayName = usePantryDisplayName(pantryDetails.name);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const pantryIngredientIds = useMemo(
    () => new Set(pantryDetails.ingredients.map((item) => item.id)),
    [pantryDetails.ingredients],
  );
  const filteredIngredients = useMemo(
    () =>
      pantryDetails.ingredients
        .toReversed()
        .filter(
          (ingredient) =>
            selectedFilter === "All" || selectedFilter === ingredient.category,
        ),
    [pantryDetails.ingredients, selectedFilter],
  );
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
        backgroundColor: theme.backgroundColor,
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
            <PantryPill pantryPage={true}></PantryPill>
            <View style={{ gap: 20, flex: 1 }}>
              <Search
                addedIds={pantryIngredientIds}
                onSelectIngredient={(item: Food) =>
                  setPantryDetails((prev) => {
                    const alreadyAdded = prev.ingredients.some(
                      (ingredient) => ingredient.id === item.id,
                    );
                    const nextIngredients = alreadyAdded
                      ? prev.ingredients
                      : [...prev.ingredients, item];

                    return {
                      ...prev,
                      ingredients: nextIngredients,
                    };
                  })
                }
                onRemoveIngredient={(item: Food) =>
                  setPantryDetails((prev) => ({
                    ...prev,
                    ingredients: prev.ingredients.filter(
                      (ingredient) => ingredient.id !== item.id,
                    ),
                  }))
                }
              />

              <View style={styles.pantryTip}>
                <Text
                  style={[styles.textLeft, { color: theme.fontColor }]}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                >
                  <Text style={{ fontFamily: "Nunito-SemiBold" }}>Tip: </Text>
                  Be sure to add any leftover dishes you have at home and want
                  to use in recipes!
                </Text>

                <Image
                  source={icons3d["Pizza"]}
                  style={{ width: 60, height: 60, marginBottom: 4 }}
                />
              </View>

              <View style={{ gap: 10 }}>
                <FilterIngredients
                  setCurrentSelected={setSelectedFilter}
                  currentSelected={selectedFilter}
                  categories={ingredientCategories}
                />
                {filteredIngredients.map((ingredient: Food) => (
                  <IngredientTag
                    key={ingredientKey(ingredient)}
                    ingredient={ingredient}
                  ></IngredientTag>
                ))}
              </View>
              {pantryDetails.ingredients.length < 1 ? (
                <Reanimated.View
                  entering={FadeIn.duration(250)}
                  exiting={FadeOut.duration(150)}
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
                    color={theme.redAccent}
                    size={36}
                  />
                  <Text
                    style={[
                      styles.textCenterBold,
                      {
                        fontFamily: "Nunito-Bold",
                        fontSize: 20,
                        color: theme.basicText,
                      },
                    ]}
                  >
                    {pantryDisplayName} is empty
                  </Text>
                  <Text
                    style={[
                      styles.textCentered,
                      {
                        fontFamily: "Nunito-SemiBold",
                        fontSize: 15,
                        color: theme.placeholderText,
                        textAlign: "center",
                      },
                    ]}
                  >
                    Add the ingredients you have at home to get started!
                  </Text>
                </Reanimated.View>
              ) : filteredIngredients.length < 1 ? (
                <Reanimated.View
                  entering={FadeIn.duration(250)}
                  exiting={FadeOut.duration(150)}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    paddingHorizontal: 20,
                  }}
                >
                  <CustomIcon
                    name="empty-box-fill"
                    filled
                    color={theme.redAccent}
                    size={36}
                  />
                  <Text
                    style={[
                      styles.textCenterBold,
                      {
                        fontFamily: "Nunito-Bold",
                        fontSize: 20,
                        color: theme.basicText,
                      },
                    ]}
                  >
                    Nothing here yet...
                  </Text>
                  <Text
                    style={[
                      styles.textCentered,
                      {
                        fontFamily: "Nunito-SemiBold",
                        fontSize: 15,
                        color: theme.placeholderText,
                        textAlign: "center",
                      },
                    ]}
                  >
                    Ingredients you add in this category will show up here
                  </Text>
                </Reanimated.View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        colors={[
          hexToRgba(theme.backgroundColor, 0),
          hexToRgba(theme.backgroundColor, 0.75),
          hexToRgba(theme.backgroundColor, 0.98),
          theme.backgroundColor,
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
