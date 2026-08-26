import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { FlashList } from "@shopify/flash-list";
import AppImage from "@/components/universal/AppImage";
import { router } from "expo-router";
import RecipeContext from "@/contexts/RecipeContext";
import * as Haptics from "expo-haptics";
import { initialRecipeData } from "@/contexts/RecipeContext";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";
import icons3d from "@/components/universal/3dIcons";
import { getTintedBoxShadow } from "@/utils/shadow";

const data = [
  { id: "1", name: "Leftovers", color: "grey", icon: "Pizza" },
  { id: "2", name: "Snacks", color: "grey", icon: "Pretzel" },
  { id: "3", name: "Dinner", color: "grey", icon: "Steak" },
  { id: "4", name: "Dessert", color: "grey", icon: "Cake" },
  { id: "5", name: "Sides", color: "grey", icon: "Fries" },
  { id: "6", name: "Lunch", color: "grey", icon: "Burger" },
  { id: "7", name: "Beverages", color: "grey", icon: "Float" },
  { id: "8", name: "Breakfast", color: "grey", icon: "EggAndBacon" },
  { id: "9", name: "Vegetarian", color: "grey", icon: "Eggplant" },
  { id: "10", name: "Vegan", color: "grey", icon: "Salad" },
];

const FeaturedRecipeButton = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const [recipeData, setRecipeData] = useContext(RecipeContext);
  const [generationDetails, setGenerationDetails] = useContext(
    GenerationDetailsContext,
  );
  return (
    <View style={styles.categoriesSlider}>
      <FlashList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={0.85}
        overScrollMode="never"
        // @ts-ignore
        estimatedItemSize={30}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={({ item }) => {
          const itemBackgroundColor =
            theme[`${item.color}Block` as keyof typeof theme];
          return (
            <Pressable
              key={item.id}
              style={[
                styles.homeBlock,
                {
                  backgroundColor: itemBackgroundColor,
                  width: 80,
                  height: 100,
                  marginRight: Number(item.id) === data.length ? 0 : 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                },
                getTintedBoxShadow(itemBackgroundColor as string, isDark),
              ]}
              onPress={() => [
                setGenerationDetails((prev) => ({
                  ...prev,
                  portalCategory: item.name,
                })),
                router.navigate("/recipe"),
                setRecipeData(initialRecipeData),
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
              ]}
            >
              <Text
                style={[styles.textCentered, { fontFamily: "Nunito-SemiBold" }]}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <AppImage
                source={
                  item.icon
                    ? icons3d[item.icon] || icons3d.Default
                    : icons3d.Default
                }
                style={{
                  width: 57,
                  height: 57,

                  alignSelf: "center",
                }}
              ></AppImage>
            </Pressable>
          );
        }}
      ></FlashList>
    </View>
  );
};

const FeaturedRecipes = () => {
  const styles = useStyles();
  return (
    <View style={styles.paddingOnlyWrapper}>
      <Text style={[styles.basicTextLeft, { fontSize: 20, marginVertical: 5 }]}>
        Browse Recipes
      </Text>
      <FeaturedRecipeButton></FeaturedRecipeButton>
    </View>
  );
};

export default FeaturedRecipes;
